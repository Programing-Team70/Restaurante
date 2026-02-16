using RestaurantManagementSystem.Application.Dtos.Order;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface IOrderService
{
    IEnumerable<OrderDto> GetAllOrders();
    OrderDto GetOrderById(int id);
    void AddOrder(OrderCreateDto orderDto);
    void UpdateOrder(int id, OrderCreateDto orderDto);
    void DeleteOrder(int id);
}
