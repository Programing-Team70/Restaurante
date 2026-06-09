using System.Security.Cryptography;
using System.Text;

namespace AuthService.Application.Services;

public static class UuidGenerator
{
    private static readonly string Alphabet = "123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";

    private static string GenerateRandomString()
    {
        using var rng = RandomNumberGenerator.Create();
        var bytes = new byte[12];
        rng.GetBytes(bytes);

        var result = new StringBuilder(12);
        for (int i = 0; i < 12; i++)
        {
            result.Append(Alphabet[bytes[i] % Alphabet.Length]);
        }

        return result.ToString();
    }

    public static string GenerateUserId()
    {
        return $"usr_{GenerateRandomString()}";
    }

    public static string GenerateRoleId()
    {
        return $"rol_{GenerateRandomString()}";
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
}