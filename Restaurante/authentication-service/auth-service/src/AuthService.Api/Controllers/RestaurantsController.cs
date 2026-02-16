namespace AuthService.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using AuthService.Application.Services;
using AuthService.Domain.Entities;

[ApiController]
[Route("v1/[controller]")]
public class RestaurantsController : ControllerBase
{
    private readonly RestaurantService restaurantService;

    public RestaurantsController(RestaurantService restaurantService2)
    {
        restaurantService = restaurantService2;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await restaurantService.GetAll());

    [HttpPost]
    public async Task<IActionResult> Create(Restaurant restaurant)
    {
        await restaurantService.Create(restaurant);
        return Ok();
    }
}