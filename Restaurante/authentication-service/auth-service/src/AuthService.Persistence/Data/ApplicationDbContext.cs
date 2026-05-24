using AuthService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace AuthService.Persistence.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<UserEmail> UserEmails { get; set; }
    public DbSet<UserPasswordReset> UserPasswordResets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            var tableName = entity.GetTableName();
            if (!string.IsNullOrEmpty(tableName))
                entity.SetTableName(ToSnakeCase(tableName));

            foreach (var property in entity.GetProperties())
            {
                var columnName = property.GetColumnName();
                if (!string.IsNullOrEmpty(columnName))
                    property.SetColumnName(ToSnakeCase(columnName));
            }

            foreach (var key in entity.GetKeys())
            {
                var keyName = key.GetName();
                if (!string.IsNullOrEmpty(keyName))
                    key.SetName(ToSnakeCase(keyName));
            }

            foreach (var index in entity.GetIndexes())
            {
                var indexName = index.GetDatabaseName();
                if (!string.IsNullOrEmpty(indexName))
                    index.SetDatabaseName(ToSnakeCase(indexName));
            }
        }

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasMaxLength(16).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(25);
            entity.Property(e => e.SurName).IsRequired().HasMaxLength(25);
            entity.Property(e => e.UserName).IsRequired();
            entity.Property(e => e.Email).IsRequired();
            entity.Property(e => e.Password).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(false);
            
            entity.HasIndex(e => e.UserName).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();

            // Relaciones
            entity.HasMany(e => e.UserRoles).WithOne(ur => ur.User).HasForeignKey(ur => ur.UserId);
            entity.HasOne(e => e.UserEmail).WithOne(ue => ue.User).HasForeignKey<UserEmail>(ue => ue.UserId);
            entity.HasOne(e => e.UserPasswordReset).WithOne(upr => upr.User).HasForeignKey<UserPasswordReset>(upr => upr.UserId);
        });

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasMaxLength(16).ValueGeneratedOnAdd();
            entity.Property(e => e.UserId).HasMaxLength(16);
            entity.Property(e => e.Phone).HasMaxLength(8);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasMaxLength(16).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).IsRequired();
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasMaxLength(16).ValueGeneratedOnAdd();
            entity.Property(e => e.UserId).HasMaxLength(16);
            entity.Property(e => e.RoleId).HasMaxLength(16);
        });

        modelBuilder.Entity<UserEmail>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasMaxLength(16).ValueGeneratedOnAdd();
            entity.Property(e => e.UserId).HasMaxLength(16);
            entity.Property(e => e.EmailVerified).HasDefaultValue(false);
            entity.Property(e => e.EmailVerificationToken).HasMaxLength(256);
        });

        modelBuilder.Entity<UserPasswordReset>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasMaxLength(16).ValueGeneratedOnAdd();
            entity.Property(e => e.UserId).HasMaxLength(16);
            entity.Property(e => e.PasswordResetToken).HasMaxLength(256);
        });
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State is EntityState.Added or EntityState.Modified);

        foreach (var entry in entries)
        {
            var now = DateTime.UtcNow;

            if (entry.Entity is User user)
            {
                if (entry.State == EntityState.Added) user.CreatedAt = now;
                user.UpdatedAt = now;
            }
            else if (entry.Entity is Role role)
            {
                if (entry.State == EntityState.Added) role.CreatedAt = now;
                role.UpdatedAt = now;
            }
            else if (entry.Entity is UserRole userRole)
            {
                if (entry.State == EntityState.Added) userRole.CreatedAt = now;
                userRole.UpdatedAt = now;
            }
        }
    }

    private static string ToSnakeCase(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;

        var sb = new StringBuilder();
        for (int i = 0; i < input.Length; i++)
        {
            if (i > 0 && char.IsUpper(input[i]))
            {
                sb.Append('_');
            }
            sb.Append(char.ToLower(input[i]));
        }
        return sb.ToString();
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }
}