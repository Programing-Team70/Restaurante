namespace RestaurantManagementSystem.Application.Dtos.Table;

public class TableCreateDto
{
    public int Id { get; set; }
    public int Number { get; set; }
    public int Capacity { get; set; }
    public string Location { get; set; }
    public bool Available { get; set; }
    public int RestaurantId { get; set; }
}
