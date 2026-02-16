using RestaurantManagementSystem.Application.Dtos.Reservation;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence.Repositories;

namespace RestaurantManagementSystem.Application.Services;

public class ReservationService : IReservationService
{
    private readonly IReservationRepository _reservationRepository;

    public ReservationService(IReservationRepository reservationRepository)
    {
        _reservationRepository = reservationRepository;
    }

    public IEnumerable<ReservationDto> GetAllReservations()
    {
        var reservations = _reservationRepository.GetAll();
        return reservations.Select(r => new ReservationDto
        {
            Id = r.Id,
            UserId = r.UserId,
            TableId = r.TableId,
            ReservationDate = r.ReservationDate,
            Status = r.Status
        });
    }

    public ReservationDto GetReservationById(int id)
    {
        var reservation = _reservationRepository.GetById(id);
        if (reservation == null)
            return null;

        return new ReservationDto
        {
            Id = reservation.Id,
            UserId = reservation.UserId,
            TableId = reservation.TableId,
            ReservationDate = reservation.ReservationDate,
            Status = reservation.Status
        };
    }

    public void AddReservation(ReservationCreateDto reservationDto)
    {
        var reservation = new Reservation
        {
            UserId = reservationDto.UserId,
            TableId = reservationDto.TableId,
            ReservationDate = reservationDto.ReservationDate,
            Status = reservationDto.Status
        };

        _reservationRepository.Add(reservation);
    }

    public void UpdateReservation(int id, ReservationCreateDto reservationDto)
    {
        var reservation = _reservationRepository.GetById(id);
        if (reservation == null)
            return;

        reservation.UserId = reservationDto.UserId;
        reservation.TableId = reservationDto.TableId;
        reservation.ReservationDate = reservationDto.ReservationDate;
        reservation.Status = reservationDto.Status;

        _reservationRepository.Update(reservation);
    }

    public void DeleteReservation(int id)
    {
        var reservation = _reservationRepository.GetById(id);
        if (reservation != null)
        {
            _reservationRepository.Delete(reservation);
        }
    }
}
