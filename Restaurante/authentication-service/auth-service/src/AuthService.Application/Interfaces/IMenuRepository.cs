namespace AuthService.Application.Interfaces;
using AuthService.Domain.Entities;

public interface IMenuRepository
{
    Task AddAsync(MenuItem item);
    Task UpdateAsync(MenuItem item);
    Task DeleteAsync(Guid id);
}