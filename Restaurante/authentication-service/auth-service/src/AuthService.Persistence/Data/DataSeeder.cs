using AuthService.Domain.Entities;
using AuthService.Domain.Constants;
using Microsoft.EntityFrameworkCore;
using AuthService.Application.Services;

namespace AuthService.Persistence.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // 1. Semilla de Roles
        if (!await context.Roles.AnyAsync())
        {
            var roles = new List<Role>
            {
                new()
                {
                    Id = UuidGenerator.GenerateRoleId(),
                    Name = RoleConstants.ADMIN_ROLE,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new()
                {
                    Id = UuidGenerator.GenerateRoleId(),
                    Name = RoleConstants.USER_ROLE,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }

        // 2. Semilla de Usuario Administrador inicial
        if (!await context.Users.AnyAsync())
        {
            var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == RoleConstants.ADMIN_ROLE);

            if (adminRole != null)
            {
                var passwordHasher = new PasswordHashService();
                var userId = UuidGenerator.GenerateUserId();
                
                var profileId = UuidGenerator.GenerateUserId(); 
                var emailId = UuidGenerator.GenerateUserId();
                var userRoleId = UuidGenerator.GenerateUserId();

                var adminUser = new User
                {
                    Id = userId,
                    Name = "Admin",
                    SurName = "Kinal Sports",
                    UserName = "admin",
                    Email = "admin@kinalsports.edu.gt",
                    Password = passwordHasher.HashPassword("Kinal2026!"),
                    Status = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    UserEmail = new UserEmail
                    {
                        Id = emailId,
                        UserId = userId,
                        EmailVerified = true,
                        EmailVerificationToken = null
                    },
                    UserRoles = new List<UserRole>
                    {
                        new()
                        {
                            Id = userRoleId,
                            UserId = userId,
                            RoleId = adminRole.Id,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        }
                    }
                };

                await context.Users.AddAsync(adminUser);
                await context.SaveChangesAsync();
            }
        }
    }
}