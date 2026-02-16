using RestaurantManagementSystem.Application.Dtos.Restaurant;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface IRestaurantService
{
    IEnumerable<RestaurantDto> GetAllRestaurants();
    RestaurantDto GetRestaurantById(int id);
    void AddRestaurant(RestaurantCreateDto restaurantDto);
    void UpdateRestaurant(int id, RestaurantCreateDto restaurantDto);
    void DeleteRestaurant(int id);
}
