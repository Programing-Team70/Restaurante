using AuthService.Application.Interfaces;

namespace AuthService.Api.Models;

public class FormFileAdapter : IFileData
{
    private readonly IFormFile iformFile;
    private byte[]? data;
    public FormFileAdapter(IFormFile iformFile2)
    {
        ArgumentNullException.ThrowIfNull(iformFile2);
        iformFile = iformFile2;
    }

    public byte[] Data
    {
        get
        {
            if (data == null)
            {
                using var memoryStream = new MemoryStream();
                iformFile.CopyTo(memoryStream);
                data = memoryStream.ToArray();
            }
            return data;
        }
    }

    public string ContentType => iformFile.ContentType;
    public string FileName => iformFile.FileName;
    public long Size => iformFile.Length;
}
