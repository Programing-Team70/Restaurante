using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public interface IEventRepository
{
    IEnumerable<Event> GetAll();
    Event GetById(int id);
    void Add(Event eventItem);
    void Update(Event eventItem);
    void Delete(Event eventItem);
}
