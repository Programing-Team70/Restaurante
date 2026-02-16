using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence;

public class RestaurantDbContext : DbContext
{
    public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options) : base(options) { }

    public DbSet<Restauran> Restaurants { get; set; }
    public DbSet<Table> Tables { get; set; }
    public DbSet<Menu> Menus { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuración de relaciones
        modelBuilder.Entity<Restaurant>()
            .HasMany(r => r.Tables)
            .WithOne(t => t.Restaurant)
            .HasForeignKey(t => t.RestaurantId);

        modelBuilder.Entity<Restaurant>()
            .HasMany(r => r.Menus)
            .WithOne(m => m.Restaurant)
            .HasForeignKey(m => m.RestaurantId);

        modelBuilder.Entity<Restaurant>()
            .HasMany(r => r.Events)
            .WithOne(e => e.Restaurant)
            .HasForeignKey(e => e.RestaurantId);

        modelBuilder.Entity<Table>()
            .HasMany(t => t.Reservations)
            .WithOne(r => r.Table)
            .HasForeignKey(r => r.TableId);

        modelBuilder.Entity<Table>()
            .HasMany(t => t.Orders)
            .WithOne(o => o.Table)
            .HasForeignKey(o => o.TableId);

        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Menu)
            .WithMany()
            .HasForeignKey(oi => oi.MenuId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Reservations)
            .WithOne(r => r.User)
            .HasForeignKey(r => r.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Orders)
            .WithOne(o => o.User)
            .HasForeignKey(o => o.UserId);
    }
}
