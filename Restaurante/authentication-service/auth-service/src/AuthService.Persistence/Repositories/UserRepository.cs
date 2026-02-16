using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence;
using Microsoft.EntityFrameworkCore;

namespace RestaurantManagementSystem.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly RestaurantDbContext _context;

    public UserRepository(RestaurantDbContext context)
    {
        _context = context;
    }

    public User GetByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }

    public void Add(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }
}
