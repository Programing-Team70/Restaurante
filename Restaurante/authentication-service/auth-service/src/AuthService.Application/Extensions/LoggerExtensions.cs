using System;
using Microsoft.Extensions.Logging;

namespace AuthService.Application.Extensions;

public static partial class LoggerExtensions
{
    [LoggerMessage(
        EventId = 1001,
        Level = LogLevel.Information,
        Message = "El usuario {Username} fue registrado correctamente.")]
    public static partial void LogUserRegistered(this ILogger logger, string username);

    [LoggerMessage(
        EventId = 1002,
        Level = LogLevel.Information,
        Message = "Se ha iniciado sesion correctamente.")]
    public static partial void LogUserLoggedIn(this ILogger logger);

    [LoggerMessage(
        EventId = 1003,
        Level = LogLevel.Warning,
        Message = "No se ha podido iniciar sesion correctamente, intente de nuevo mas tarde.")]
    public static partial void LogFailedLoginAttempt(this ILogger logger);

    [LoggerMessage(
        EventId = 1004,
        Level = LogLevel.Warning,
        Message = "Error: Correo electronico existe.")]
    public static partial void LogRegistrationWithExistingEmail(this ILogger logger);

    [LoggerMessage(
        EventId = 1005,
        Level = LogLevel.Warning,
        Message = "Error: Nombre de usuario existente.")]
    public static partial void LogRegistrationWithExistingUsername(this ILogger logger);

    [LoggerMessage(
        EventId = 1006,
        Level = LogLevel.Error,
        Message = "Error: No se ha podido cargar la foto de perfil.")]
    public static partial void LogImageUploadError(this ILogger logger);
}
