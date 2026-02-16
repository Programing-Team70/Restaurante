namespace AuthService.Application.Services;

using AuthService.Application.Interfaces;
using AuthService.Domain.Entities;

public class RestaurantService
{
    private readonly IRestaurantRepository irestaurantRepository;

    public RestaurantService(IRestaurantRepository irestaurantRepository2)
    {
        irestaurantRepository = irestaurantRepository2;
    }

    public async Task<IEnumerable<Restaurant>> GetAll() => await irestaurantRepository.GetAllAsync();
    public async Task Create(Restaurant restaurant) => await irestaurantRepository.AddAsync(restaurant);
}