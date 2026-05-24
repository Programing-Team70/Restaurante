using System.Security.Cryptography;
using System.Text;

namespace AuthService.Application.Services;

public static class UuidGenerator
{
    private static readonly string Alphabet = "123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";

    private static string GenerateRandomString(int length)
    {
        using var rng = RandomNumberGenerator.Create();
        var bytes = new byte[length];
        rng.GetBytes(bytes);

        var result = new StringBuilder(length);
        foreach (var b in bytes)
        {
            result.Append(Alphabet[b % Alphabet.Length]);
        }

        return result.ToString();
    }

    public static string GenerateUserId()
    {
        return $"usr_{GenerateRandomString(12)}";
    }

    public static string GenerateRoleId()
    {
        return $"rol_{GenerateRandomString(12)}";
    }

    public static bool IsValidUserId(string? id)
    {
        if (string.IsNullOrWhiteSpace(id))
            return false;

        if (id.Length != 16 || !id.StartsWith("usr_"))
            return false;

        var idPart = id[4..]; 
        return idPart.All(c => Alphabet.Contains(c));
    }

    public static bool IsValidRoleId(string? id)
    {
        if (string.IsNullOrWhiteSpace(id))
            return false;

        if (id.Length != 16 || !id.StartsWith("rol_"))
            return false;

        var idPart = id[4..];
        return idPart.All(c => Alphabet.Contains(c));
    }
}