namespace ModForgeFS.Models.DTOs;

public class ModPartDTO
{
    public int Id { get; set; }
    public int BuildId { get; set; }
    public string Brand { get; set; }
    public string ModName { get; set; }
    public string ModType { get; set; }
    public decimal Cost { get; set; }
    public DateTime? InstallDate { get; set; }
    public string Link { get; set; }
    public string Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<TagDTO> Tags { get; set; } = new();
}
