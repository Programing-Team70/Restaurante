using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public interface ITableRepository
{
    IEnumerable<Table> GetAll();
    Table GetById(int id);
    void Add(Table table);
    void Update(Table table);
    void Delete(Table table);
}
