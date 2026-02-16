namespace RestaurantManagementSystem.Domain.Entities;

public class Reservation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TableId { get; set; }
    public DateTime ReservationDate { get; set; }
    public string Status { get; set; }
    public User User { get; set; }
    public Table Table { get; set; }
}
