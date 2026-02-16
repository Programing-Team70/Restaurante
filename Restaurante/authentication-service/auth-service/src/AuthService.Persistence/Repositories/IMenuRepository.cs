using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public interface IMenuRepository
{
    IEnumerable<Menu> GetAll();
    Menu GetById(int id);
    void Add(Menu menu);
    void Update(Menu menu);
    void Delete(Menu menu);
}
