namespace ModForgeFS.Models;

public class Build
{
    public int Id { get; set; }
    public string VehicleName { get; set; }
    public string ImageLocation { get; set; }
    public string Goal { get; set; }
    public string Status { get; set; }
    public DateTime StartDate { get; set; }
    public decimal Budget { get; set; }
    public string Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile? UserProfile{ get; set;}

    public List<ModPart> ModParts { get; set; } = new();
}
