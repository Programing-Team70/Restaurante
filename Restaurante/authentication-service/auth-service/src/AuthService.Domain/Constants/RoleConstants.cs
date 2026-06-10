using System;

namespace AuthService.Domain.Constants;

public class RoleConstants
{
    public const string CLIENTE = "CLIENTE";
    public const string EMPLEADO = "EMPLEADO";

    public static readonly string[] AllowedRoles = [CLIENTE, EMPLEADO];
}
