using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence;
using Microsoft.EntityFrameworkCore;

namespace RestaurantManagementSystem.Persistence.Repositories;

public class EventRepository : IEventRepository
{
    private readonly RestaurantDbContext _context;

    public EventRepository(RestaurantDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Event> GetAll()
    {
        return _context.Events
            .Include(e => e.Restaurant)
            .ToList();
    }

    public Event GetById(int id)
    {
        return _context.Events
            .Include(e => e.Restaurant)
            .FirstOrDefault(e => e.Id == id);
    }

    public void Add(Event eventItem)
    {
        _context.Events.Add(eventItem);
        _context.SaveChanges();
    }

    public void Update(Event eventItem)
    {
        _context.Events.Update(eventItem);
        _context.SaveChanges();
    }

    public void Delete(Event eventItem)
    {
        _context.Events.Remove(eventItem);
        _context.SaveChanges();
    }
}
