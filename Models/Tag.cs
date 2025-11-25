namespace ModForgeFS.Models;

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<ModTag> ModTags { get; set; } = new();
}
