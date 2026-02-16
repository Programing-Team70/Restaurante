using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Auth;
using RestaurantManagementSystem.Application.Interfaces;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto registerDto)
    {
        var result = _authService.Register(registerDto);
        return result ? Ok("User registered successfully") : BadRequest("User already exists");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        var token = _authService.Authenticate(loginDto.Email, loginDto.Password);
        return token != null ? Ok(new { Token = token }) : Unauthorized("Invalid credentials");
    }
}
