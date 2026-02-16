using RestaurantManagementSystem.Application.Dtos.Event;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface IEventService
{
    IEnumerable<EventDto> GetAllEvents();
    EventDto GetEventById(int id);
    void AddEvent(EventCreateDto eventCreateDto);
    void UpdateEvent(int id, EventCreateDto eventCreateDto);
    void DeleteEvent(int id);
}
