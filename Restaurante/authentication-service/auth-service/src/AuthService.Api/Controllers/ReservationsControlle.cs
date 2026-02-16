using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Reservation;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReservationsController : ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationsController(IReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var reservations = _reservationService.GetAllReservations();
        return Ok(reservations);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var reservation = _reservationService.GetReservationById(id);
        if (reservation == null)
        {
            return NotFound();
        }
        return Ok(reservation);
    }

    [HttpPost]
public IActionResult Add([FromBody] ReservationCreateDto reservationDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    _reservationService.AddReservation(reservationDto);
    return Ok();
}

[HttpPut("{id}")]
public IActionResult Update(int id, [FromBody] ReservationCreateDto reservationDto)
{
    if (id != reservationDto.Id)
    {
        return BadRequest("El ID de la reserva no coincide.");
    }
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    _reservationService.UpdateReservation(id, reservationDto);
    return Ok();
}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _reservationService.DeleteReservation(id);
        return Ok();
    }
}
