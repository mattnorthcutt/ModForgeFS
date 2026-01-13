namespace ModForgeFS.Models.DTOs;

public class ProfileDTO
{
  public int Id { get; set; }
  public string FullName { get; set; }
  public string Email { get; set; }
  public string ImageLocation { get; set; }
  public DateTime CreateDateTime { get; set; }
  public List<BuildDTO> Builds { get; set; }
}
