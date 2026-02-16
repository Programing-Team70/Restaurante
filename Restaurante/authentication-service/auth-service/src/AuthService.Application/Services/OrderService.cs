using RestaurantManagementSystem.Application.Dtos.Order;
using RestaurantManagementSystem.Application.Interfaces;
using RestaurantManagementSystem.Domain.Entities;
using RestaurantManagementSystem.Persistence.Repositories;

namespace RestaurantManagementSystem.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public IEnumerable<OrderDto> GetAllOrders()
    {
        var orders = _orderRepository.GetAll();
        return orders.Select(o => new OrderDto
        {
            Id = o.Id,
            UserId = o.UserId,
            TableId = o.TableId,
            OrderDate = o.OrderDate,
            Status = o.Status
        });
    }

    public OrderDto GetOrderById(int id)
    {
        var order = _orderRepository.GetById(id);
        if (order == null)
            return null;

        return new OrderDto
        {
            Id = order.Id,
            UserId = order.UserId,
            TableId = order.TableId,
            OrderDate = order.OrderDate,
            Status = order.Status
        };
    }

    public void AddOrder(OrderCreateDto orderDto)
    {
        var order = new Order
        {
            UserId = orderDto.UserId,
            TableId = orderDto.TableId,
            OrderDate = orderDto.OrderDate,
            Status = orderDto.Status
        };

        _orderRepository.Add(order);
    }

    public void UpdateOrder(int id, OrderCreateDto orderDto)
    {
        var order = _orderRepository.GetById(id);
        if (order == null)
            return;

        order.UserId = orderDto.UserId;
        order.TableId = orderDto.TableId;
        order.OrderDate = orderDto.OrderDate;
        order.Status = orderDto.Status;

        _orderRepository.Update(order);
    }

    public void DeleteOrder(int id)
    {
        var order = _orderRepository.GetById(id);
        if (order != null)
        {
            _orderRepository.Delete(order);
        }
    }
}
