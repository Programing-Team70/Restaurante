using FluentValidation;
using RestaurantManagementSystem.Application.Dtos.Table;

namespace RestaurantManagementSystem.Application.Validators;

public class TableValidator : AbstractValidator<TableCreateDto>
{
    public TableValidator()
    {
        RuleFor(table => table.Number).GreaterThan(0).WithMessage("El número de mesa debe ser mayor que cero.");
        RuleFor(table => table.Capacity).GreaterThan(0).WithMessage("La capacidad debe ser mayor que cero.");
        RuleFor(table => table.Location).NotEmpty().WithMessage("La ubicación es obligatoria.");
    }
}
