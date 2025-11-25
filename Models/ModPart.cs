namespace ModForgeFS.Models;

public class ModPart
{
    public int Id { get; set; }
    public int BuildId { get; set; }
    public Build Build { get; set; }
    public required string Brand { get; set; }
    public required string ModName { get; set; }
    public required string ModType { get; set; }
    public decimal Cost { get; set; }
    public DateTime InstallDate { get; set; }
    public required string Link { get; set; }
    public required string Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<ModTag> ModTags { get; set; } = new();
}
