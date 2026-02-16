namespace AuthService.Application.Interfaces;
using AuthService.Domain.Entities;

public interface ITableRepository
{
    Task AddAsync(Table table);
    Task UpdateAsync(Table table);
    Task DeleteAsync(Guid id);
}