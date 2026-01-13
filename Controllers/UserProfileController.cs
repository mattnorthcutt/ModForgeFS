using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModForgeFS.Data;
using ModForgeFS.Models.DTOs;

namespace ModForgeFS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
  private readonly ModForgeDbContext _dbContext;
  
  public UserProfileController(ModForgeDbContext dbContext)
  {
    _dbContext = dbContext;
  }

[HttpGet("me")]
[Authorize]
public IActionResult GetMyProfile()
  {
    var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (identityUserId == null) return Unauthorized();

    var profile = _dbContext.UserProfiles.Include(up => up.IdentityUser).SingleOrDefault(up => up.IdentityUserId == identityUserId);
    if (profile == null) return Unauthorized();

    var builds = _dbContext.Builds.Where(b => b.UserProfileId == profile.Id).OrderByDescending(b => b.CreatedAt).Select(b => new BuildDTO
    {
      Id = b.Id,
      VehicleName = b.VehicleName,
      ImageLocation = b.ImageLocation,
      Goal = b.Goal,
      Status = b.Status,
      StartDate = b.StartDate,
      Budget = b.Budget,
      Notes = b.Notes,
      CreatedAt = b.CreatedAt,
      IsPublic = b.IsPublic
    }).ToList();

    var dto = new ProfileDTO
    {
      Id = profile.Id,
      FullName = $"{profile.FirstName} {profile.LastName}",
      Email = profile.IdentityUser.Email,
      ImageLocation = profile.ImageLocation,
      CreateDateTime = profile.CreateDateTime,
      Builds = builds
    };

    return Ok(dto);
  }
}
