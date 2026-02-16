using System.Collections.Generic;

namespace AuthService.Domain.Entities;

public class Restaurant
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Schedule { get; set; }
    public string Category { get; set; }
    public decimal AveragePrice { get; set; }
    public string Contact { get; set; }
    public string Photo { get; set; }

    public ICollection<Table> Tables { get; set; } = new List<Table>();
    public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
}