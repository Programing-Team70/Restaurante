using System;
using AuthService.Domain.Entities;
using AuthService.Domain.Interfaces;
using AuthService.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Persistence.Repositories;

public class RoleRepository(ApplicationDbContext context) : IRoleRepository
{
    public async Task<Role?> GetByNameAsync(string roleName)
    {
        var role = await (context.Roles ?? throw new InvalidOperationException("Roles in DbSet are null."))
            .FirstOrDefaultAsync(r => r.Name == roleName);

        return role;
    }

    public async Task<int> CountUsersInRoleAsync(string roleName)
    {
        var count = await (context.UserRoles ?? throw new InvalidOperationException("UserRoles in DbSet are null."))
            .Include(ur => ur.Role)
            .Where(ur => ur.Role.Name == roleName)
            .Select(ur => ur.UserId)
            .Distinct()
            .CountAsync();

        return count;
    }

    public async Task<IReadOnlyList<string>> GetUserRoleNameAsync(string userId)
    {
        var roles = await (context.UserRoles ?? throw new InvalidOperationException("Users in DbSet are null."))
            .Include(ur => ur.Role)
            .Where(ur => ur.UserId == userId)
            .Select(ur => ur.Role.Name)
            .ToListAsync();

        return roles;
    }

    public async Task<IReadOnlyList<User>> GetUsersByRoleAsync(string roleName)
    {
        var users = await (context.Users ?? throw new InvalidOperationException("UserRoles in DbSet are null."))
            .Include(u => u.UserEmail)
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .Where(u => u.UserRoles.Any(ur => ur.Role.Name == roleName))
            .ToListAsync();

        return users;
    }


}
