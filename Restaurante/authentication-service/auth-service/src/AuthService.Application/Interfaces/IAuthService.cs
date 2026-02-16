using RestaurantManagementSystem.Application.Dtos.Auth;

namespace RestaurantManagementSystem.Application.Interfaces;

public interface IAuthService
{
    string Authenticate(string email, string password);
    bool Register(RegisterDto registerDto);
}
