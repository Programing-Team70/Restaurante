using FluentValidation;
using RestaurantManagementSystem.Application.Dtos.Order;

namespace RestaurantManagementSystem.Application.Validators;

public class OrderValidator : AbstractValidator<OrderCreateDto>
{
    public OrderValidator()
    {
        RuleFor(order => order.UserId).GreaterThan(0).WithMessage("El ID de usuario debe ser mayor que cero.");
        RuleFor(order => order.TableId).GreaterThan(0).WithMessage("El ID de mesa debe ser mayor que cero.");
    }
}
