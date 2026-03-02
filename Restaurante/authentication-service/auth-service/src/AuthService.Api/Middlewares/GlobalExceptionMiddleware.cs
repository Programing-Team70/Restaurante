using System.Net;
using System.Text.Json;
using AuthService.Api.Models;
using AuthService.Application.Exceptions;

namespace AuthService.Api.Middlewares;

public class GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        } catch (Exception ex)
        {
            logger.LogError(ex, "Error: Se ha producido una excepcion.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = exception switch
        {
            BusinessException businessEx => new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Title = "Logica Empresarial",
                Detail = businessEx.Message,
                ErrorCode = businessEx.ErrorCode
            },
            UnauthorizedAccessException => new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.Unauthorized,
                Title = "Sin Autorizacion",
                Detail = "Credenciales inválidas o permisos insuficientes."
            },
            ArgumentException argEx => new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Title = "Argumentos Invalidos",
                Detail = argEx.Message
            },
            InvalidOperationException invOpEx => MapInvalidOperation(invOpEx), _ => new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Title = "Servidor Interno",
                Detail = "Error: Se ha producido un error en el servidor interno."
            }
        };

        context.Response.StatusCode = response.StatusCode;

        var unified = new
        {
            success = false,
            message = response.Detail,
            errorCode = response.ErrorCode,
            traceId = response.TraceId,
            timestamp = response.Timestamp
        };
        var jsonResponse = JsonSerializer.Serialize(unified, JsonOptions);
        await context.Response.WriteAsync(jsonResponse);
    }

    private static ErrorResponse MapInvalidOperation(InvalidOperationException ex)
    {
        var message = ex.Message ?? string.Empty;
        var lower = message.ToLowerInvariant();

        if (lower.Contains("not found"))
        {
            return new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.NotFound,
                Title = "No Encontrado.",
                Detail = message
            };
        }
        if (lower.Contains("last administrator") || lower.Contains("conflict"))
        {
            return new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.Conflict,
                Title = "Conflicto.",
                Detail = message
            };
        }

        return new ErrorResponse
        {
            StatusCode = (int)HttpStatusCode.BadRequest,
            Title = "Operacion Invalida",
            Detail = message
        };
    }
}

