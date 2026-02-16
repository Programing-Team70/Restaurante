using RestaurantManagementSystem.Application.Dtos.Menu;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence.Repositories;

namespace RestaurantManagementSystem.Application.Services;

public class MenuService : IMenuService
{
    private readonly IMenuRepository _menuRepository;

    public MenuService(IMenuRepository menuRepository)
    {
        _menuRepository = menuRepository;
    }

    public IEnumerable<MenuDto> GetAllMenus()
    {
        var menus = _menuRepository.GetAll();
        return menus.Select(m => new MenuDto
        {
            Id = m.Id,
            Name = m.Name,
            Description = m.Description,
            Price = m.Price,
            Category = m.Category,
            Available = m.Available,
            ImageUrl = m.ImageUrl,
            RestaurantId = m.RestaurantId
        });
    }

    public MenuDto GetMenuById(int id)
    {
        var menu = _menuRepository.GetById(id);
        if (menu == null)
            return null;

        return new MenuDto
        {
            Id = menu.Id,
            Name = menu.Name,
            Description = menu.Description,
            Price = menu.Price,
            Category = menu.Category,
            Available = menu.Available,
            ImageUrl = menu.ImageUrl,
            RestaurantId = menu.RestaurantId
        };
    }

    public void AddMenu(MenuCreateDto menuDto)
    {
        var menu = new Menu
        {
            Name = menuDto.Name,
            Description = menuDto.Description,
            Price = menuDto.Price,
            Category = menuDto.Category,
            Available = menuDto.Available,
            ImageUrl = menuDto.ImageUrl,
            RestaurantId = menuDto.RestaurantId
        };

        _menuRepository.Add(menu);
    }

    public void UpdateMenu(int id, MenuCreateDto menuDto)
    {
        var menu = _menuRepository.GetById(id);
        if (menu == null)
            return;

        menu.Name = menuDto.Name;
        menu.Description = menuDto.Description;
        menu.Price = menuDto.Price;
        menu.Category = menuDto.Category;
        menu.Available = menuDto.Available;
        menu.ImageUrl = menuDto.ImageUrl;
        menu.RestaurantId = menuDto.RestaurantId;

        _menuRepository.Update(menu);
    }

    public void DeleteMenu(int id)
    {
        var menu = _menuRepository.GetById(id);
        if (menu != null)
        {
            _menuRepository.Delete(menu);
        }
    }
}
