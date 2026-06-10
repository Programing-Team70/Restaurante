using System;
using AuthService.Application.DTOs;
using AuthService.Application.DTOs.Email;
using AuthService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using AuthService.Domain.Constants;

namespace AuthService.Api.Controllers;

[ApiController]
[Route("res/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserManagementService _userManagementService;
    private readonly IRefreshTokenService _refreshTokenService;

    public AuthController(IAuthService authService, IUserManagementService userManagementService, IRefreshTokenService refreshTokenService)
    {
        _authService = authService;
        _userManagementService = userManagementService;
        _refreshTokenService = refreshTokenService;
    }

    // Tokens, actualizar y desabilitar en caso de ser necesario.
    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
    {
        var result = await _refreshTokenService.RotateAsync(dto.RefreshToken);
        return Ok(result);
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout([FromBody] RefreshRequestDto dto)
    {
        await _refreshTokenService.RevokeAsync(dto.RefreshToken);
        return Ok(new { message = "Sesión cerrada correctamente." });
    }

    //Registro y Autentificación, Crear usuarios e iniciar sesión en caso de ser necesario.
    [HttpPost("register")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<RegisterResponseDto>> Register([FromBody] RegisterDto registerDto)
    {
        var result = await _authService.RegisterAsync(registerDto);
        return StatusCode(201, result);
    }

    [HttpPost("login")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        var result = await _authService.LoginAsync(loginDto);
        return Ok(result);
    }

    // Email, verificar email, 
    [HttpPost("verify-email")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<EmailResponseDto>> VerifyEmail([FromBody] VerifyEmailDto verifyEmailDto)
    {
        var result = await _authService.VerifyEmailAsync(verifyEmailDto);
        return Ok(result);
    }

    [HttpPost("resend-verification")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<EmailResponseDto>> ResendVerification([FromBody] ResendVerificationDto resendDto)
    {
        var result = await _authService.ResendVerificationEmailAsync(resendDto);
        if (!result.Success)
        {
            if (result.Message.Contains("Correo no encontrado: ", StringComparison.OrdinalIgnoreCase))
                return NotFound(result);
            if (result.Message.Contains("Correo verificado: ", StringComparison.OrdinalIgnoreCase))
                return BadRequest(result);
            return StatusCode(503, result);
        }
        return Ok(result);
    }

    [HttpPost("forgot-password")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<EmailResponseDto>> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        var result = await _authService.ForgotPasswordAsync(forgotPasswordDto);
        if (!result.Success)
            return StatusCode(503, result);
        return Ok(result);
    }

    [HttpPost("reset-password")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<EmailResponseDto>> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        var result = await _authService.ResetPasswordAsync(resetPasswordDto);
        return Ok(result);
    }
}