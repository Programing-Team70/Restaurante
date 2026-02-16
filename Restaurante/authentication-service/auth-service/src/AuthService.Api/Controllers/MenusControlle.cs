using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Menu;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "AdministradorRestaurante,AdministradorPlataforma")]
public class MenusController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenusController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var menus = _menuService.GetAllMenus();
        return Ok(menus);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var menu = _menuService.GetMenuById(id);
        if (menu == null) return NotFound();
        return Ok(menu);
    }

    [HttpPost]
    public IActionResult Add([FromBody] MenuCreateDto menuDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        _menuService.AddMenu(menuDto);
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] MenuCreateDto menuDto)
    {
        if (id != menuDto.Id) return BadRequest("El ID del menú no coincide.");
        if (!ModelState.IsValid) return BadRequest(ModelState);
        _menuService.UpdateMenu(id, menuDto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _menuService.DeleteMenu(id);
        return Ok();
    }
}
