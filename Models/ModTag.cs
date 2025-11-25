namespace ModForgeFS.Models;

public class ModTag
{
    public int Id { get; set; }
    public int ModPartId { get; set; }
    public ModPart ModPart { get; set; }
    public int TagId { get; set; }
    public Tag Tag { get; set; }
}
