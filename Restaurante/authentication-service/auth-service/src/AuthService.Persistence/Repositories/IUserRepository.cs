using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public interface IUserRepository
{
    User GetByEmail(string email);
    void Add(User user);
}
