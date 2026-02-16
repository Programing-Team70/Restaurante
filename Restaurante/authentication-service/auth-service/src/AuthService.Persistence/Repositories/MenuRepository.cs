using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Persistence.Repositories;

public class MenuRepository : IMenuRepository
{
    private readonly RestaurantDbContext _context;

    public MenuRepository(RestaurantDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Menu> GetAll()
    {
        return _context.Menus.ToList();
    }

    public Menu GetById(int id)
    {
        return _context.Menus.FirstOrDefault(m => m.Id == id);
    }

    public void Add(Menu menu)
    {
        _context.Menus.Add(menu);
        _context.SaveChanges();
    }

    public void Update(Menu menu)
    {
        _context.Menus.Update(menu);
        _context.SaveChanges();
    }

    public void Delete(Menu menu)
    {
        _context.Menus.Remove(menu);
        _context.SaveChanges();
    }
}
