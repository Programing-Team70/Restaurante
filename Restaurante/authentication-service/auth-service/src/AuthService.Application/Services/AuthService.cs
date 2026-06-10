using AuthService.Application.DTOs;
using AuthService.Application.Interfaces;
using AuthService.Application.Exceptions;
using AuthService.Application.Extensions;
using AuthService.Domain.Constants;
using AuthService.Domain.Entities;
using AuthService.Domain.Interfaces;
using AuthService.Domain.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using AuthService.Application.DTOs.Email;
using System.Security.Cryptography.X509Certificates;

namespace AuthService.Application.Services;

public class AuthService(
    IRefreshTokenService refreshTokenService,
    IUserRepository userRepository,
    IRoleRepository roleRepository,
    IPasswordHashService passwordHashService,
    IJwtTokenService jwtTokenService,
    IEmailService emailService,
    // IConfiguration configuration,
    ILogger<AuthService> logger) : IAuthService
{
    public async Task<RegisterResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        // Verificar si el correo electrónico o el nombre de usuario ya existen
        if (await userRepository.ExistsByEmailAsync(registerDto.Email))
        {
            logger.LogRegistrationWithExistingEmail();
            throw new BusinessException(ErrorCodes.EMAIL_ALREADY_EXISTS, "Correo Electronico Existente.");
        }

        if (await userRepository.ExistsByUsernameAsync(registerDto.Username))
        {
            logger.LogRegistrationWithExistingUsername();
            throw new BusinessException(ErrorCodes.USERNAME_ALREADY_EXISTS, "Nombre de Usuario Existente.");
        }

        // Crear el usuario
        var emailVerificationToken = TokenGenerator.GenerateEmailVerificationToken();
        var userId = UuidGenerator.GenerateUserId();
        var userEmailId = UuidGenerator.GenerateUserId();
        var userRoleId = UuidGenerator.GenerateUserId();

        // Si el rol predeterminado no existe, lanzar una excepción
        var defaultRole = await roleRepository.GetByNameAsync(RoleConstants.CLIENTE) ?? throw new InvalidOperationException($"Rol predeterminado '{RoleConstants.CLIENTE}' no encontrado. Asegúrese de que la inicialización se ejecute antes del registro.");

        var user = new User
        {
            Id = userId,
            Name = registerDto.Name,
            SurName = registerDto.Surname,
            UserName = registerDto.Username,
            Phone = registerDto.Phone,
            Email = registerDto.Email.ToLowerInvariant(),
            Password = passwordHashService.HashPassword(registerDto.Password),
            Status = false,
            UserEmail = new UserEmail
            {
                Id = userEmailId,
                UserId = userId,
                EmailVerified = false,
                EmailVerificationToken = emailVerificationToken,
                EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24)
            },
            UserRoles =
            [
                new Domain.Entities.UserRole
                {
                    Id = userRoleId,
                    UserId = userId,
                    RoleId = defaultRole.Id
                }
            ],
            UserPasswordReset = new UserPasswordReset
            {
                Id = UuidGenerator.GenerateUserId(),
                UserId = userId,
                PasswordResetToken = null,
                PasswordResetTokenExpiry = null
            }
        };

        var createdUser = await userRepository.CreateUserAsync(user);
        logger.LogUserRegistered(createdUser.UserName);

        _ = Task.Run(async () =>
        {
            try
            {
                await emailService.SendEmailVerificationAsync(createdUser.Email, createdUser.UserName, emailVerificationToken);
                logger.LogInformation("Se ha enviado el correo electronico de verificacion.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "No se ha enviado el correo electronico de verificacion.");
            }
        });

        return new RegisterResponseDto
        {
            Success = true,
            User = MapToUserResponseDto(createdUser),
            Message = "Usuario registrado exitosamente. Por favor, verifica tu email para activar la cuenta.",
            EmailVerificationRequired = true
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        User? user = null;

        if (loginDto.EmailOrUsername.Contains('@'))
        {
            // Si el input contiene '@', se asume que es un correo electrónico
            user = await userRepository.GetByEmailAsync(loginDto.EmailOrUsername.ToLowerInvariant());
        }
        else
        {
            // Si el input no contiene '@', se asume que es un nombre de usuario
            user = await userRepository.GetByUsernameAsync(loginDto.EmailOrUsername);
        }

        // Validar el usuario
        if (user == null)
        {
            logger.LogFailedLoginAttempt();
            throw new UnauthorizedAccessException("Credenciales Invalidas.");
        }

        // Verificar si el correo electrónico ha sido verificado
        if (!user.Status)
        {
            logger.LogFailedLoginAttempt();
            throw new UnauthorizedAccessException("Cuenta de Usuario Desabilitada.");
        }

        // Verificar la contraseña
        if (!passwordHashService.VerifyPassword(loginDto.Password, user.Password))
        {
            logger.LogFailedLoginAttempt();
            throw new UnauthorizedAccessException("Credenciales Invalidas.");
        }

        logger.LogUserLoggedIn();

        // Generar el token JWT
        var accessToken = await jwtTokenService.GenerateTokenAsync(user.Id, expiresInMinutes: 20);
        var (refreshToken, _) = await refreshTokenService.CreateAsync(user.Id);

        // Combinar el token de acceso y el token de actualización en un solo token JWT
        return new AuthResponseDto
        {
            Success = true,
            Message = "Se ha iniciado sesion correctamente.",
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            UserDetails = MapToUserDetailsDto(user),
            ExpiresAt = 20 * 60 // 20 minutos en segundos
        };
    }

    // Métodos privados para mapear entidades a DTOs
    private UserResponseDto MapToUserResponseDto(User user)
    {
        var userRole = user.UserRoles.FirstOrDefault()?.Role?.Name ?? RoleConstants.CLIENTE;
        return new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Surname = user.SurName,
            Username = user.UserName,
            Phone = user.Phone,
            Email = user.Email,
            Role = userRole,
            Status = user.Status,
            IsEmailVerified = user.UserEmail?.EmailVerified ?? false,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };
    }

    private UserDetailsDto MapToUserDetailsDto(User user)
    {
        return new UserDetailsDto
        {
            Id = user.Id,
            Username = user.UserName,
            Role = user.UserRoles.FirstOrDefault()?.Role?.Name ?? RoleConstants.CLIENTE
        };
    }

    public async Task<EmailResponseDto> VerifyEmailAsync(VerifyEmailDto verifyEmailDto)
    {
        var user = await userRepository.GetByEmailVerificationTokenAsync(verifyEmailDto.Token);
        if (user == null || user.UserEmail == null)
        {
            return new EmailResponseDto
            {
                Success = false,
                Message = "Token de verificación invalido o vencido."
            };
        }

        user.UserEmail.EmailVerified = true;
        user.Status = true;
        user.UserEmail.EmailVerificationToken = null;
        user.UserEmail.EmailVerificationTokenExpiry = null;

        await userRepository.UpdateUserAsync(user);

        // Enviar correo electrónico de bienvenida
        try
        {
            await emailService.SendWelcomeEmailAsync(user.Email, user.UserName);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "No se ha enviado el correo electronico de bienvenida a {Email}", user.Email);
        }

        logger.LogInformation("Se la enviado el correo electronico de bienvenida a {Username}", user.UserName);

        return new EmailResponseDto
        {
            Success = true,
            Message = "Correo electronico verificado correctamente.",
            Data = new
            {
                email = user.Email,
                verified = true
            }
        };
    }

    public async Task<EmailResponseDto> ResendVerificationEmailAsync(ResendVerificationDto resendDto)
    {
        var user = await userRepository.GetByEmailAsync(resendDto.Email);
        if (user == null || user.UserEmail == null)
        {
            return new EmailResponseDto
            {
                Success = false,
                Message = "Usuario no encontrado.",
                Data = new { email = resendDto.Email, sent = false }
            };
        }

        if (user.UserEmail.EmailVerified)
        {
            return new EmailResponseDto
            {
                Success = false,
                Message = "El correo electronico verificado correctamente.",
                Data = new { email = user.Email, verified = true }
            };
        }

        // Generar un nuevo token de verificación y actualizar el usuario
        var newToken = TokenGenerator.GenerateEmailVerificationToken();
        user.UserEmail.EmailVerificationToken = newToken;
        user.UserEmail.EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24);

        await userRepository.UpdateUserAsync(user);

        // Enviar el correo electrónico de verificación
        try
        {
            await emailService.SendEmailVerificationAsync(user.Email, user.UserName, newToken);
            return new EmailResponseDto
            {
                Success = true,
                Message = "Se ha enviado el correo electronico de verificación.",
                Data = new { email = user.Email, sent = true }
            };
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "No se ha envado el correo electronico de verificación a {Email}", user.Email);
            return new EmailResponseDto
            {
                Success = false,
                Message = "Error: No ha enviado el correo electronico de verificación.",
                Data = new { email = user.Email, sent = false }
            };
        }
    }

    public async Task<EmailResponseDto> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
    {
        var user = await userRepository.GetByEmailAsync(forgotPasswordDto.Email);

        if (user == null)
        {
            return new EmailResponseDto
            {
                Success = true,
                Message = "Correo electronico existente, se ha enviado enlace de recuperacion.",
                Data = new { email = forgotPasswordDto.Email, initiated = true }
            };
        }

        var resetToken = TokenGenerator.GeneratePasswordResetToken();

        if (user.UserPasswordReset == null)
        {
            user.UserPasswordReset = new UserPasswordReset
            {
                UserId = user.Id,
                PasswordResetToken = resetToken,
                PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1)
            };
        }
        else
        {
            user.UserPasswordReset.PasswordResetToken = resetToken;
            user.UserPasswordReset.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1);
        }
        await userRepository.UpdateUserAsync(user);

        // Enviar el correo electrónico de recuperación de contraseña
        try
        {
            await emailService.SendPasswordResetAsync(user.Email, user.UserName, resetToken);
            logger.LogInformation("Se ha enviado el correo electronico de recuperacion de contraseña a {Email}", user.Email);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "No se ha enviado el correo electronico de recuperacion de contraseña a {Email}", user.Email);
        }

        return new EmailResponseDto
        {
            Success = true,
            Message = "Correo electronico existente, se ha enviado un enlace de recuperación",
            Data = new { email = forgotPasswordDto.Email, initiated = true }
        };
    }

    public async Task<EmailResponseDto> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
    {
        var user = await userRepository.GetByPasswordResetTokenAsync(resetPasswordDto.Token);
        if (user == null || user.UserPasswordReset == null)
        {
            return new EmailResponseDto
            {
                Success = false,
                Message = "Token de recuperacion invalido o vencido.",
                Data = new { token = resetPasswordDto.Token, reset = false }
            };
        }

        user.Password = passwordHashService.HashPassword(resetPasswordDto.NewPassword);
        user.UserPasswordReset.PasswordResetToken = null;
        user.UserPasswordReset.PasswordResetTokenExpiry = null;

        await userRepository.UpdateUserAsync(user);

        logger.LogInformation("Contraseña reestablecida en {Username}", user.UserName);

        return new EmailResponseDto
        {
            Success = true,
            Message = "Contraseña reestablecida correctamente.",
            Data = new { email = user.Email, reset = true }
        };
    }

    public async Task<UserResponseDto?> GetUserByIdAsync(string userId)
    {
        var user = await userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            return null;
        }
        return MapToUserResponseDto(user);
    }
}