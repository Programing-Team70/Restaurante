using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public interface IReservationRepository
{
    IEnumerable<Reservation> GetAll();
    Reservation GetById(int id);
    void Add(Reservation reservation);
    void Update(Reservation reservation);
    void Delete(Reservation reservation);
}
