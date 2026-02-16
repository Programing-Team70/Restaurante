using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence;
using Microsoft.EntityFrameworkCore;

namespace RestaurantManagementSystem.Persistence.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly RestaurantDbContext _context;

    public ReservationRepository(RestaurantDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Reservation> GetAll()
    {
        return _context.Reservations
            .Include(r => r.User)
            .Include(r => r.Table)
            .ToList();
    }

    public Reservation GetById(int id)
    {
        return _context.Reservations
            .Include(r => r.User)
            .Include(r => r.Table)
            .FirstOrDefault(r => r.Id == id);
    }

    public void Add(Reservation reservation)
    {
        _context.Reservations.Add(reservation);
        _context.SaveChanges();
    }

    public void Update(Reservation reservation)
    {
        _context.Reservations.Update(reservation);
        _context.SaveChanges();
    }

    public void Delete(Reservation reservation)
    {
        _context.Reservations.Remove(reservation);
        _context.SaveChanges();
    }
}
