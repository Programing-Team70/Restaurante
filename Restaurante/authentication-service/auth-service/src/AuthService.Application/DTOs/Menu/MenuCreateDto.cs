using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Application.Dtos.Menu;

public class MenuCreateDto
{
    public int Id { get; set; } 

    [Required(ErrorMessage = "El nombre del menú es obligatorio.")]
    public string Name { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor que cero.")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "La categoría es obligatoria.")]
    public string Category { get; set; }

    public string Description { get; set; }
    public bool Available { get; set; }
    public string ImageUrl { get; set; }
    public int RestaurantId { get; set; }
}
