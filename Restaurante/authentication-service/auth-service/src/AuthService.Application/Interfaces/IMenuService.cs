using RestaurantManagementSystem.Application.Dtos.Menu;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface IMenuService
{
    IEnumerable<MenuDto> GetAllMenus();
    MenuDto GetMenuById(int id);
    void AddMenu(MenuCreateDto menuDto);
    void UpdateMenu(int id, MenuCreateDto menuDto);
    void DeleteMenu(int id);
}
