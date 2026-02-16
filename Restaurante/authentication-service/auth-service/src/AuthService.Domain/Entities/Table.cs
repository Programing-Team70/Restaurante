namespace AuthService.Domain.Entities;

public class Table
{
    public Guid Id { get; set; }
    public int Capacity { get; set; }
    public string Location { get; set; }
    public bool IsAvailable { get; set; }

    public Guid RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; }
}