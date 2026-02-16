public class OrderCreateDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TableId { get; set; }
    public DateTime OrderDate { get; set; }
    public string Status { get; set; }
}
