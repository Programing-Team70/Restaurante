using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence;
using Microsoft.EntityFrameworkCore;

namespace RestaurantManagementSystem.Persistence.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly RestaurantDbContext _context;

    public OrderRepository(RestaurantDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Order> GetAll()
    {
        return _context.Orders
            .Include(o => o.User)
            .Include(o => o.Table)
            .Include(o => o.OrderItems)
            .ToList();
    }

    public Order GetById(int id)
    {
        return _context.Orders
            .Include(o => o.User)
            .Include(o => o.Table)
            .Include(o => o.OrderItems)
            .FirstOrDefault(o => o.Id == id);
    }

    public void Add(Order order)
    {
        _context.Orders.Add(order);
        _context.SaveChanges();
    }

    public void Update(Order order)
    {
        _context.Orders.Update(order);
        _context.SaveChanges();
    }

    public void Delete(Order order)
    {
        _context.Orders.Remove(order);
        _context.SaveChanges();
    }
}
