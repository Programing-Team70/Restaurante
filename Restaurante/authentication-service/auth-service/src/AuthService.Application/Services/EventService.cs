using RestaurantManagementSystem.Application.Dtos.Event;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence.Repositories;

namespace RestaurantManagementSystem.Application.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;

    public EventService(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }

    public IEnumerable<EventDto> GetAllEvents()
    {
        var events = _eventRepository.GetAll();
        return events.Select(e => new EventDto
        {
            Id = e.Id,
            Name = e.Name,
            Description = e.Description,
            EventDate = e.EventDate,
            Type = e.Type,
            RestaurantId = e.RestaurantId
        });
    }

    public EventDto GetEventById(int id)
    {
        var eventItem = _eventRepository.GetById(id);
        if (eventItem == null)
            return null;

        return new EventDto
        {
            Id = eventItem.Id,
            Name = eventItem.Name,
            Description = eventItem.Description,
            EventDate = eventItem.EventDate,
            Type = eventItem.Type,
            RestaurantId = eventItem.RestaurantId
        };
    }

    public void AddEvent(EventCreateDto eventCreateDto)
    {
        var eventItem = new Event
        {
            Name = eventCreateDto.Name,
            Description = eventCreateDto.Description,
            EventDate = eventCreateDto.EventDate,
            Type = eventCreateDto.Type,
            RestaurantId = eventCreateDto.RestaurantId
        };

        _eventRepository.Add(eventItem);
    }

    public void UpdateEvent(int id, EventCreateDto eventCreateDto)
    {
        var eventItem = _eventRepository.GetById(id);
        if (eventItem == null)
            return;

        eventItem.Name = eventCreateDto.Name;
        eventItem.Description = eventCreateDto.Description;
        eventItem.EventDate = eventCreateDto.EventDate;
        eventItem.Type = eventCreateDto.Type;
        eventItem.RestaurantId = eventCreateDto.RestaurantId;

        _eventRepository.Update(eventItem);
    }

    public void DeleteEvent(int id)
    {
        var eventItem = _eventRepository.GetById(id);
        if (eventItem != null)
        {
            _eventRepository.Delete(eventItem);
        }
    }
}
