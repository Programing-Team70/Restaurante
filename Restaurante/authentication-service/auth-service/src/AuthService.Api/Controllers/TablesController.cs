using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Application.Dtos.Table;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;

namespace RestaurantManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "AdministradorRestaurante,AdministradorPlataforma")]
public class TablesController : ControllerBase
{
    private readonly ITableService _tableService;

    public TablesController(ITableService tableService)
    {
        _tableService = tableService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var tables = _tableService.GetAllTables();
        return Ok(tables);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var table = _tableService.GetTableById(id);
        if (table == null)
        {
            return NotFound();
        }
        return Ok(table);
    }

    [HttpPost]
    public IActionResult Add([FromBody] TableCreateDto tableDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _tableService.AddTable(tableDto);
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] TableCreateDto tableDto)
    {
        if (id != tableDto.Id) 
        {
            return BadRequest("El ID de la mesa no coincide.");
        }
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _tableService.UpdateTable(id, tableDto);
        return Ok();
    }


    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _tableService.DeleteTable(id);
        return Ok();
    }
}
