using RestaurantManagementSystem.Application.Dtos.Table;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface ITableService
{
    IEnumerable<TableDto> GetAllTables();
    TableDto GetTableById(int id);
    void AddTable(TableCreateDto tableDto);
    void UpdateTable(int id, TableCreateDto tableDto);
    void DeleteTable(int id);
}
