using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Restaurant;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "AdministradorRestaurante,AdministradorPlataforma")]
public class RestaurantsController : ControllerBase
{
    private readonly IRestaurantService _restaurantService;

    public RestaurantsController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var restaurants = _restaurantService.GetAllRestaurants();
        return Ok(restaurants);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var restaurant = _restaurantService.GetRestaurantById(id);
        if (restaurant == null)
        {
            return NotFound();
        }
        return Ok(restaurant);
    }

    [HttpPost]
public IActionResult Add([FromBody] RestaurantCreateDto restaurantDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    _restaurantService.AddRestaurant(restaurantDto);
    return Ok();
}

[HttpPut("{id}")]
public IActionResult Update(int id, [FromBody] RestaurantCreateDto restaurantDto)
{
    if (id != restaurantDto.Id) 
    {
        return BadRequest("El ID del restaurante no coincide.");
    }
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    _restaurantService.UpdateRestaurant(id, restaurantDto);
    return Ok();
}

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _restaurantService.DeleteRestaurant(id);
        return Ok();
    }
}
