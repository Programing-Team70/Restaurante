namespace RestaurantManagementSystem.Application.Dtos.Event;

public class EventDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime EventDate { get; set; }
    public string Type { get; set; }
    public int RestaurantId { get; set; }
}
