using AuthService.Application.Interfaces;
using Konscious.Security.Cryptography;
using System.Security.Cryptography;
using System.Text;

namespace AuthService.Application.Services;

public class PasswordHashService : IPasswordHashService
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 2;
    private const int Memory = 65536;       
    private const int Parallelism = 1;      

    public string HashPassword(string password)
    {
        var salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = Parallelism,
            Iterations = Iterations,
            MemorySize = Memory
        };

        var hash = argon2.GetBytes(HashSize);

        var saltBase64 = Convert.ToBase64String(salt).TrimEnd('=');
        var hashBase64 = Convert.ToBase64String(hash).TrimEnd('=');

        return $"$argon2id$v=19$m={Memory},t={Iterations},p={Parallelism}${saltBase64}${hashBase64}";
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        try
        {
            if (string.IsNullOrEmpty(hashedPassword)) return false;

            if (hashedPassword.StartsWith("$argon2id$"))
            {
                return VerifyArgon2StandardFormat(password, hashedPassword);
            }

            return VerifyLegacyFormat(password, hashedPassword);
        }
        catch
        {
            return false;
        }
    }

    private bool VerifyArgon2StandardFormat(string password, string hashedPassword)
    {
        var parts = hashedPassword.Split('$');
        if (parts.Length != 6) return false;

        var parameters = parts[3].Split(',');
        int m = Memory, t = Iterations, p = Parallelism;

        foreach (var param in parameters)
        {
            if (param.StartsWith("m=")) m = int.Parse(param[2..]);
            if (param.StartsWith("t=")) t = int.Parse(param[2..]);
            if (param.StartsWith("p=")) p = int.Parse(param[2..]);
        }

        byte[] salt = DecodeBase64WithoutPadding(parts[4]);
        byte[] expectedHash = DecodeBase64WithoutPadding(parts[5]);

        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = p,
            Iterations = t,
            MemorySize = m
        };

        var computedHash = argon2.GetBytes(expectedHash.Length);
        return CryptographicOperations.FixedTimeEquals(expectedHash, computedHash);
    }

    private bool VerifyLegacyFormat(string password, string hashedPassword)
    {
        try 
        {
            var hashBytes = Convert.FromBase64String(hashedPassword);
            if (hashBytes.Length < SaltSize + HashSize) return false;

            var salt = new byte[SaltSize];
            var hash = new byte[HashSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);
            Array.Copy(hashBytes, SaltSize, hash, 0, HashSize);

            using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                DegreeOfParallelism = Parallelism,
                Iterations = Iterations,
                MemorySize = Memory
            };

            var computedHash = argon2.GetBytes(HashSize);
            return CryptographicOperations.FixedTimeEquals(hash, computedHash);
        }
        catch { return false; }
    }

    private static byte[] DecodeBase64WithoutPadding(string base64)
    {
        string padded = base64.Length % 4 == 0 ? base64 : base64.PadRight(base64.Length + (4 - base64.Length % 4), '=');
        return Convert.FromBase64String(padded);
    }
}