using Microsoft.EntityFrameworkCore;
using AuthService.Application.Interfaces;
using AuthService.Domain.Entities;

public class RestaurantRepository : IRestaurantRepository
{
    private readonly RestaurantDbContext restaurantDbContext;

    public RestaurantRepository(RestaurantDbContext restaurantDbContext2)
    {
        restaurantDbContext = restaurantDbContext2;
    }

    public async Task<IEnumerable<Restaurant>> GetAllAsync() => await restaurantDbContext.Restaurants
        .Include(r => r.Tables)
        .Include(r => r.MenuItems)
        .ToListAsync();

    public async Task<Restaurant> GetByIdAsync(Guid id) => await restaurantDbContext.Restaurants.FindAsync(id);

    public async Task AddAsync(Restaurant restaurant)
    {
        await restaurantDbContext.Restaurants.AddAsync(restaurant);
        await restaurantDbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Restaurant restaurant)
    {
        restaurantDbContext.Restaurants.Update(restaurant);
        await restaurantDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var restaurant = await restaurantDbContext.Restaurants.FindAsync(id);
        restaurantDbContext.Restaurants.Remove(restaurant);
        await restaurantDbContext.SaveChangesAsync();
    }
}