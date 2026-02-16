using Konscious.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RestaurantManagementSystem.Application.Dtos.Auth;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RestaurantManagementSystem.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public string Authenticate(string email, string password)
    {
        var user = _userRepository.GetByEmail(email);
        if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
            return null;

        return GenerateJwtToken(user);
    }

    public bool Register(RegisterDto registerDto)
    {
        var existingUser = _userRepository.GetByEmail(registerDto.Email);
        if (existingUser != null)
            return false;

        var user = new User
        {
            Email = registerDto.Email,
            PasswordHash = HashPassword(registerDto.Password),
            Role = registerDto.Role
        };

        _userRepository.Add(user);
        return true;
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private bool VerifyPasswordHash(string password, string storedHash)
    {
        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            DegreeOfParallelism = 4,
            Iterations = 3,
            MemorySize = 19456 
        };
        byte[] hash = argon2.GetBytes(16);
        return Convert.ToBase64String(hash) == storedHash;
    }

    private string HashPassword(string password)
    {
        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            DegreeOfParallelism = 4,
            Iterations = 3,
            MemorySize = 19456
        };
        byte[] hash = argon2.GetBytes(16);
        return Convert.ToBase64String(hash);
    }
}
