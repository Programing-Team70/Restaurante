using AuthService.Domain.Entities;
using AuthService.Domain.Constants;
using Microsoft.EntityFrameworkCore;
using AuthService.Application.Services;

namespace AuthService.Persistence.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Verificación si ya existen roles
        if (!(context.Roles?.Any() ?? false))
        {
            var roles = new List<Role>
            {
                new()
                {
                    Id = UuidGenerator.GenerateRoleId(),
                    Name = RoleConstants.EMPLEADO
                },
                new()
                {
                    Id = UuidGenerator.GenerateRoleId(),
                    Name = RoleConstants.CLIENTE
                }
            };

            await context.Roles!.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }

        // Registra un empleado por defecto solo si no existen usuarios en el sistema
        if (!(await (context.Users?.AnyAsync() ?? Task.FromResult(false))))
        {
            var employeeRole = await (context.Roles ?? throw new InvalidOperationException("Roles DbSet is null."))
                .FirstOrDefaultAsync(r => r.Name == RoleConstants.EMPLEADO);

            if (employeeRole != null)
            {
                var passwordHasher = new PasswordHashService();

                var userId = UuidGenerator.GenerateUserId();
                var emailId = UuidGenerator.GenerateUserId();
                var userRoleId = UuidGenerator.GenerateUserId();

                var adminUser = new User
                {
                    Id = userId,
                    Name = "Administradora",
                    SurName = "General",
                    UserName = "ADO",
                    Phone = "00000000",
                    Email = "ado@gmail.com",
                    Password = passwordHasher.HashPassword("ADO"),
                    Status = true,
                    UserEmail = new UserEmail
                    {
                        Id = emailId,
                        UserId = userId,
                        EmailVerified = true,
                        EmailVerificationToken = null,
                        EmailVerificationTokenExpiry = null
                    },
                    UserRoles =
                    {
                        new UserRole
                        {
                            Id = userRoleId,
                            UserId = userId,
                            RoleId = employeeRole.Id
                        }
                    }
                };

                await context.Users!.AddAsync(adminUser);
                await context.SaveChangesAsync();
            }
        }
    }
}