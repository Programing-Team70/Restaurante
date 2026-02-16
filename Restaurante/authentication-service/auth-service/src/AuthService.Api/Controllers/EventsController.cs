using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Event;
using RestaurantManagementSystem.Application.Interfaces;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "AdministradorRestaurante,AdministradorPlataforma")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var events = _eventService.GetAllEvents();
        return Ok(events);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var eventItem = _eventService.GetEventById(id);
        if (eventItem == null)
        {
            return NotFound();
        }
        return Ok(eventItem);
    }

    [HttpPost]
    public IActionResult Add([FromBody] EventCreateDto eventCreateDto)
    {
        _eventService.AddEvent(eventCreateDto);
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] EventCreateDto eventCreateDto)
    {
        if (id <= 0)
        {
            return BadRequest("El ID del evento no es válido.");
        }

        eventCreateDto.Id = id;
        _eventService.UpdateEvent(id, eventCreateDto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _eventService.DeleteEvent(id);
        return Ok();
    }
}
