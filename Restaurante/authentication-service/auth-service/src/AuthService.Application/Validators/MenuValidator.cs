using FluentValidation;
using RestaurantManagementSystem.Application.Dtos.Menu;

namespace RestaurantManagementSystem.Application.Validators;

public class MenuValidator : AbstractValidator<MenuCreateDto>
{
    public MenuValidator()
    {
        RuleFor(menu => menu.Name).NotEmpty().WithMessage("El nombre del menú es obligatorio.");
        RuleFor(menu => menu.Price).GreaterThan(0).WithMessage("El precio debe ser mayor que cero.");
        RuleFor(menu => menu.Category).NotEmpty().WithMessage("La categoría es obligatoria.");
    }
}
