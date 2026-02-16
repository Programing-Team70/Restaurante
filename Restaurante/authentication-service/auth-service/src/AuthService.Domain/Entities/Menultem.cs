using AuthService.Domain.Enums;

namespace AuthService.Domain.Entities;

public class MenuItem
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Ingredients { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public MenuType Type { get; set; }

    public Guid RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; }
}