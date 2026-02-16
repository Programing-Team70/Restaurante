using RestaurantManagementSystem.Application.Dtos.Table;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence.Repositories;

namespace RestaurantManagementSystem.Application.Services;

public class TableService : ITableService
{
    private readonly ITableRepository _tableRepository;

    public TableService(ITableRepository tableRepository)
    {
        _tableRepository = tableRepository;
    }

    public IEnumerable<TableDto> GetAllTables()
    {
        var tables = _tableRepository.GetAll();
        return tables.Select(t => new TableDto
        {
            Id = t.Id,
            Number = t.Number,
            Capacity = t.Capacity,
            Location = t.Location,
            Available = t.Available,
            RestaurantId = t.RestaurantId
        });
    }

    public TableDto GetTableById(int id)
    {
        var table = _tableRepository.GetById(id);
        if (table == null)
            return null;

        return new TableDto
        {
            Id = table.Id,
            Number = table.Number,
            Capacity = table.Capacity,
            Location = table.Location,
            Available = table.Available,
            RestaurantId = table.RestaurantId
        };
    }

    public void AddTable(TableCreateDto tableDto)
    {
        var table = new Table
        {
            Number = tableDto.Number,
            Capacity = tableDto.Capacity,
            Location = tableDto.Location,
            Available = tableDto.Available,
            RestaurantId = tableDto.RestaurantId
        };

        _tableRepository.Add(table);
    }

    public void UpdateTable(int id, TableCreateDto tableDto)
    {
        var table = _tableRepository.GetById(id);
        if (table == null)
            return;

        table.Number = tableDto.Number;
        table.Capacity = tableDto.Capacity;
        table.Location = tableDto.Location;
        table.Available = tableDto.Available;
        table.RestaurantId = tableDto.RestaurantId;

        _tableRepository.Update(table);
    }

    public void DeleteTable(int id)
    {
        var table = _tableRepository.GetById(id);
        if (table != null)
        {
            _tableRepository.Delete(table);
        }
    }
}
