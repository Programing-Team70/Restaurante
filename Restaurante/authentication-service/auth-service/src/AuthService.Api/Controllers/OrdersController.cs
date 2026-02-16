using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Order;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var orders = _orderService.GetAllOrders();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var order = _orderService.GetOrderById(id);
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    [HttpPost]
public IActionResult Add([FromBody] OrderCreateDto orderDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    _orderService.AddOrder(orderDto);
    return Ok();
}

[HttpPut("{id}")]
public IActionResult Update(int id, [FromBody] OrderCreateDto orderDto)
{
    if (id != orderDto.Id)
    {
        return BadRequest("El ID de la orden no coincide.");
    }
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    _orderService.UpdateOrder(id, orderDto);
    return Ok();
}


    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _orderService.DeleteOrder(id);
        return Ok();
    }
}
