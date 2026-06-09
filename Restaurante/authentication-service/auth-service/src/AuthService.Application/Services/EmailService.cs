using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using AuthService.Application.Interfaces;

namespace AuthService.Application.Services;

public class EmailService(IConfiguration configuration, ILogger<EmailService> logger) : IEmailService
{
    public async Task SendEmailVerificationAsync(string email, string username, string token)
    {
        var subject = "Verifica tu dirección de correo electrónico";
        var verificationUrl = $"{configuration["AppSettings:FrontendUrl"]}/verify-email?token={token}";

        var body = $@"
            <div style='background-color: #f8f9fa; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, ""Segoe UI"", Roboto, Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 550px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;'>
                    <tr>
                        <td style='background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 40px 30px; text-align: center;'>
                            <h1 style='color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;'>¡Bienvenido a bordo!</h1>
                        </td>
                    </tr>
                
                    <tr>
                        <td style='padding: 40px 30px;'>
                            <p style='margin-top: 0; font-size: 16px; color: #4b5563;'>Hola <strong>{username}</strong>,</p>
                            <p style='font-size: 16px; color: #4b5563;'>Estamos muy emocionados de tenerte aquí. Antes de comenzar a explorar, necesitamos que confirmes tu dirección de correo electrónico haciendo clic en el botón de abajo:</p>
                        
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='margin: 35px 0;'>
                                <tr>
                                    <td align='center'>
                                        <a href='{verificationUrl}' target='_blank' style='background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); transition: background-color 0.2s;'>
                                            Verificar mi cuenta →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        
                            <p style='font-size: 14px; color: #6b7280; margin-bottom: 0;'>
                                <strong>Nota:</strong> Este enlace de verificación caducará en 24 horas por motivos de seguridad.
                            </p>
                        </td>
                    </tr>
                
                    <tr>
                        <td style='padding: 0 30px;'>
                            <hr style='border: 0; border-top: 1px solid #e5e7eb; margin: 0;'>
                        </td>
                    </tr>
                
                    <tr>
                        <td style='padding: 30px; background-color: #fafafa;'>
                            <p style='margin-top: 0; font-size: 12px; color: #9ca3af; line-height: 1.5;'>
                                Si el botón no funciona, copia y pega esta URL en tu navegador:
                                <br>
                                <a href='{verificationUrl}' style='color: #4f46e5; text-decoration: underline; word-break: break-all;'>{verificationUrl}</a>
                            </p>
                            <p style='margin-bottom: 0; font-size: 12px; color: #9ca3af; text-align: center; margin-top: 25px;'>
                                Si no creaste esta cuenta, puedes ignorar este correo de forma segura.
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        ";

        await SendEmailAsync(email, subject, body);
    }

    public async Task SendPasswordResetAsync(string email, string username, string token)
    {
        var subject = "Restablece tu contraseña";
        var resetUrl = $"{configuration["AppSettings:FrontendUrl"]}/reset-password?token={token}";

        var body = $@"
            <div style='background-color: #f8f9fa; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, ""Segoe UI"", Roboto, Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 550px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;'>
                    <!-- Header de Seguridad -->
                    <tr>
                        <td style='background: linear-gradient(135deg, #475569 0%, #1e293b 100%); padding: 40px 30px; text-align: center;'>
                            <h1 style='color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;'>¿Olvidaste tu contraseña?</h1>
                        </td>
                    </tr>
                    
                    <!-- Contenido Principal -->
                    <tr>
                        <td style='padding: 40px 30px;'>
                            <p style='margin-top: 0; font-size: 16px; color: #4b5563;'>Hola <strong>{username}</strong>,</p>
                            <p style='font-size: 16px; color: #4b5563;'>Recibimos una solicitud para restablecer la contraseña de tu cuenta. No te preocupes, puedes crear una nueva haciendo clic en el botón de abajo:</p>
                            
                            <!-- Botón de Acción -->
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='margin: 35px 0;'>
                                <tr>
                                    <td align='center'>
                                        <a href='{resetUrl}' target='_blank' style='background-color: #e11d48; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(225, 29, 72, 0.2); transition: background-color 0.2s;'>
                                            Restablecer contraseña →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Aviso de Expiración -->
                            <div style='background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; border-radius: 4px; margin-bottom: 10px;'>
                                <p style='font-size: 14px; color: #c2410c; margin: 0;'>
                                    ⏳ <strong>Por seguridad:</strong> Este enlace expirará en <strong>1 hora</strong>. Pasado este tiempo, deberás solicitar uno nuevo.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Separador -->
                    <tr>
                        <td style='padding: 0 30px;'>
                            <hr style='border: 0; border-top: 1px solid #e5e7eb; margin: 0;'>
                        </td>
                    </tr>
                    
                    <!-- Enlace alternativo y pie de página -->
                    <tr>
                        <td style='padding: 30px; background-color: #fafafa;'>
                            <p style='margin-top: 0; font-size: 12px; color: #9ca3af; line-height: 1.5;'>
                                Si tienes problemas con el botón, copia y pega esta URL en tu navegador:
                                <br>
                                <a href='{resetUrl}' style='color: #e11d48; text-decoration: underline; word-break: break-all;'>{resetUrl}</a>
                            </p>
                            <p style='margin-bottom: 0; font-size: 12px; color: #9ca3af; text-align: center; margin-top: 25px; line-height: 1.4;'>
                                <strong>¿No solicitaste este cambio?</strong> Puedes ignorar este correo con total tranquilidad; tu contraseña actual seguirá siendo segura y no sufrirá cambios.
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        ";

        await SendEmailAsync(email, subject, body);
    }

    public async Task SendWelcomeEmailAsync(string email, string username)
    {
        var subject = "¡Te damos la bienvenida a Heaven Flavor!";

        var body = $@"
            <div style='background-color: #fcfbf9; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, ""Segoe UI"", Roboto, Helvetica, Arial, sans-serif; color: #3e322b; line-height: 1.6;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 550px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(62, 50, 43, 0.08); overflow: hidden; border: 1px solid #f1ede9;'>
                    <!-- Cabecera Gastronómica -->
                    <tr>
                        <td style='background: linear-gradient(135deg, #2d221c 0%, #4a372c 100%); padding: 45px 30px; text-align: center;'>
                            <span style='font-size: 35px; display: inline-block; margin-bottom: 10px;'>🍽️</span>
                            <h1 style='color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;'>¡Bienvenido a Heaven Flavor, {username}!</h1>
                            <p style='color: #f59e0b; margin: 5px 0 0 0; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;'>Haven Flavor en tu mesa</p>
                        </td>
                    </tr>
                    
                    <!-- Contenido Principal -->
                    <tr>
                        <td style='padding: 40px 30px;'>
                            <p style='margin-top: 0; font-size: 16px; color: #2d221c; font-weight: 600;'>¡Tu cuenta ha sido creada y activada con éxito!</p>
                            <p style='font-size: 15px; color: #5c4d44;'>Nos emociona muchísimo tenerte con nosotros. A partir de ahora, puedes disfrutar de todas las funciones de nuestra plataforma: explorar nuestro menú digital, conocer las especialidades de la casa</p>
                            
                            <!-- Sección de Soporte Informativo -->
                            <div style='background-color: #fdfbf7; border-left: 4px solid #d97706; border-radius: 4px; padding: 15px;'>
                                <p style='font-size: 14px; color: #78350f; margin: 0;'>
                                    🛎️ <strong>¿Tienes alguna pregunta?</strong><br>
                                    Si necesitas ayuda para navegar en la web o tienes alguna duda, no dudes en contactar a nuestro equipo de soporte. ¡Estamos listos para ayudarte!
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Línea Divisoria -->
                    <tr>
                        <td style='padding: 0 30px;'>
                            <hr style='border: 0; border-top: 1px solid #f1ede9; margin: 0;'>
                        </td>
                    </tr>
                    
                    <!-- Pie de Página / Footer -->
                    <tr>
                        <td style='padding: 30px; background-color: #faf8f5; text-align: center;'>
                            <p style='margin: 0; font-size: 14px; color: #4a372c; font-weight: 600;'>
                                ¡Gracias por unirte a nosotros!
                            </p>
                            <p style='margin-top: 15px; margin-bottom: 0; font-size: 11px; color: #a19288;'>
                                Este es un correo automático del sistema. Por favor, no respondas directamente a este mensaje.
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        ";

        await SendEmailAsync(email, subject, body);
    }

    private async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtpSettings = configuration.GetSection("SmtpSettings");

        try
        {
            var enabled = bool.Parse(smtpSettings["Enabled"] ?? "true");
            if (!enabled)
            {
                logger.LogInformation("El envío de emails está deshabilitado. Omitiendo envío.");
                return;
            }

            var host = smtpSettings["Host"];
            var portString = smtpSettings["Port"];
            var username = smtpSettings["Username"];
            var password = smtpSettings["Password"];
            var fromEmail = smtpSettings["FromEmail"];
            var fromName = smtpSettings["FromName"];

            if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                logger.LogError("La configuración SMTP es incompleta. Host, Username y Password son requeridos.");
                throw new InvalidOperationException("La configuración SMTP es incompleta.");
            }

            var port = int.Parse(portString ?? "587");

            using var client = new SmtpClient();

            client.Timeout = int.Parse(smtpSettings["Timeout"] ?? "30000");

            try
            {
                var ignoreCertErrors = bool.Parse(smtpSettings["IgnoreCertificateErrors"] ?? "false");
                if (ignoreCertErrors)
                {
                    logger.LogWarning("Validación de certificados SSL deshabilitada. Solo usar en desarrollo.");
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                }

                var useImplicitSsl = bool.Parse(smtpSettings["UseImplicitSsl"] ?? "false");

                if (useImplicitSsl || port == 465)
                {
                    await client.ConnectAsync(host, port, SecureSocketOptions.SslOnConnect);
                }
                else
                {
                    await client.ConnectAsync(host, port, port == 587 ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto);
                }

                await client.AuthenticateAsync(username, password);

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(new MailboxAddress("", to));
                message.Subject = subject;
                message.Body = new TextPart("html") { Text = body };

                await client.SendAsync(message);
                logger.LogInformation("Email enviado exitosamente");
                await client.DisconnectAsync(true);
                logger.LogInformation("Pipeline de email completado");
            }
            catch (MailKit.Security.AuthenticationException authEx)
            {
                logger.LogError(authEx, "La autenticación de Gmail falló. Verifica la contraseña de aplicación.");
                throw new InvalidOperationException($"La autenticación de Gmail falló: {authEx.Message}. Por favor, verifica la contraseña de aplicación.", authEx);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error al enviar el email");
                throw;
            }
            logger.LogInformation("Email pipeline finalizado");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error crítico al procesar el envío de email");

            var useFallback = bool.Parse(smtpSettings["UseFallback"] ?? "false");
            if (useFallback)
            {
                logger.LogInformation("Usando fallback para el envío de email");
                return;
            }

            throw new InvalidOperationException($"Error al enviar el email: {ex.Message}", ex);
        }
    }
}