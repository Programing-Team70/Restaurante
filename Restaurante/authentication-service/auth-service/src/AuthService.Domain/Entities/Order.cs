namespace RestaurantManagementSystem.Domain.Entities;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TableId { get; set; }
    public DateTime OrderDate { get; set; }
    public string Status { get; set; }
    public User User { get; set; }
    public Table Table { get; set; }
    public List<OrderItem> OrderItems { get; set; }
}
