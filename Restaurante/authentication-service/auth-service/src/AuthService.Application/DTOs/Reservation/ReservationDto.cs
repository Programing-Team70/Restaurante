namespace RestaurantManagementSystem.Application.Dtos.Reservation;

public class ReservationDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TableId { get; set; }
    public DateTime ReservationDate { get; set; }
    public string Status { get; set; }
}
