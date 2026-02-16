using RestaurantManagementSystem.Application.Dtos.Reservation;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface IReservationService
{
    IEnumerable<ReservationDto> GetAllReservations();
    ReservationDto GetReservationById(int id);
    void AddReservation(ReservationCreateDto reservationDto);
    void UpdateReservation(int id, ReservationCreateDto reservationDto);
    void DeleteReservation(int id);
}
