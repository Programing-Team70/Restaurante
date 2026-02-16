using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence;
using Microsoft.EntityFrameworkCore;

namespace RestaurantManagementSystem.Persistence.Repositories;

public class TableRepository : ITableRepository
{
    private readonly RestaurantDbContext _context;

    public TableRepository(RestaurantDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Table> GetAll()
    {
        return _context.Tables.ToList();
    }

    public Table GetById(int id)
    {
        return _context.Tables.FirstOrDefault(t => t.Id == id);
    }

    public void Add(Table table)
    {
        _context.Tables.Add(table);
        _context.SaveChanges();
    }

    public void Update(Table table)
    {
        _context.Tables.Update(table);
        _context.SaveChanges();
    }

    public void Delete(Table table)
    {
        _context.Tables.Remove(table);
        _context.SaveChanges();
    }
}
