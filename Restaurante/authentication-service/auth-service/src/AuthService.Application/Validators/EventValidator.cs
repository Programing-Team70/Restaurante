using FluentValidation;
using RestaurantManagementSystem.Application.Dtos.Event;

namespace RestaurantManagementSystem.Application.Validators;

public class EventValidator : AbstractValidator<EventCreateDto>
{
    public EventValidator()
    {
        RuleFor(eventItem => eventItem.Name).NotEmpty().WithMessage("El nombre del evento es obligatorio.");
        RuleFor(eventItem => eventItem.EventDate).GreaterThan(DateTime.Now).WithMessage("La fecha del evento debe ser en el futuro.");
        RuleFor(eventItem => eventItem.Type).NotEmpty().WithMessage("El tipo de evento es obligatorio.");
    }
}
