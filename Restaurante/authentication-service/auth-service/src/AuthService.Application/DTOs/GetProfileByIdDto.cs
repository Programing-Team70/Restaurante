using System.ComponentModel.DataAnnotations;

namespace AuthService.Application.DTOs;

public class GetProfileByIdDto
{
    [Required(ErrorMessage = "El ID del usuario es requerido")]
    public string UserId { get; set; } = string.Empty;
}
