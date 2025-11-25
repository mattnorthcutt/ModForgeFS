namespace ModForgeFS.Models.DTOs;

public class BuildDTO
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
}
