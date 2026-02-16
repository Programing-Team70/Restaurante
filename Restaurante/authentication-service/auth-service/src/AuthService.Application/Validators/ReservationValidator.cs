using FluentValidation;
using RestaurantManagementSystem.Application.Dtos.Reservation;

namespace RestaurantManagementSystem.Application.Validators;

public class ReservationValidator : AbstractValidator<ReservationCreateDto>
{
    public ReservationValidator()
    {
        RuleFor(reservation => reservation.UserId).GreaterThan(0).WithMessage("El ID de usuario debe ser mayor que cero.");
        RuleFor(reservation => reservation.TableId).GreaterThan(0).WithMessage("El ID de mesa debe ser mayor que cero.");
        RuleFor(reservation => reservation.ReservationDate).GreaterThan(DateTime.Now).WithMessage("La fecha de reservación debe ser en el futuro.");
    }
}
