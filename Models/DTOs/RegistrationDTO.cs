using System.ComponentModel.DataAnnotations;

namespace ModForge.Models.DTOs;

public class RegistrationDTO
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [DataType(DataType.Url)]
    public string? ImageLocation { get; set; }

}
