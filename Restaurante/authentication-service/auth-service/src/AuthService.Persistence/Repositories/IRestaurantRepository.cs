using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public interface IRestaurantRepository
{
    IEnumerable<Restaurant> GetAll();
    Restaurant GetById(int id);
    void Add(Restaurant restaurant);
    void Update(Restaurant restaurant);
    void Delete(Restaurant restaurant);
}
