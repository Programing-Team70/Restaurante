using FluentValidation;
using RestaurantManagementSystem.Application.Dtos.Restaurant;

namespace RestaurantManagementSystem.Application.Validators;

public class RestaurantValidator : AbstractValidator<RestaurantCreateDto>
{
    public RestaurantValidator()
    {
        RuleFor(restaurant => restaurant.Name).NotEmpty().WithMessage("El nombre del restaurante es obligatorio.");
        RuleFor(restaurant => restaurant.Address).NotEmpty().WithMessage("La dirección es obligatoria.");
        RuleFor(restaurant => restaurant.AveragePrice).GreaterThan(0).WithMessage("El precio promedio debe ser mayor que cero.");
    }
}
