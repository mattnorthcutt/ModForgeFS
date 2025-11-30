using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ModForgeFS.Data;
using ModForgeFS.Models;

namespace ModForgeFS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ModPartController : ControllerBase
{
    private readonly ModForgeDbContext _dbContext;

    public ModPartController(ModForgeDbContext dbContext)
    {
        _dbContext = dbContext;
    }

  [HttpPost]
  [Authorize]
  public IActionResult CreateModPart(ModPart modPart)
  {
    if (modPart == null)
    {
      return BadRequest();
    }

    var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (identityUserId == null)
    {
      return Unauthorized();
    }

    var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

    if (profile == null)
    {
      return Unauthorized();
    }

    var build = _dbContext.Builds.SingleOrDefault(b => b.Id == modPart.BuildId && b.UserProfileId == profile.Id);

    if (build == null)
    {
      return NotFound();
    }

    modPart.Id = 0;
    modPart.CreatedAt = DateTime.Now;
    _dbContext.ModParts.Add(modPart);
    _dbContext.SaveChanges();

    return Created($"/api/modpart/{modPart.Id}", modPart);
  }

  [HttpPut("{id}")]
  [Authorize]
  public IActionResult UpdateModPart(int id, ModPart updatedModPart)
  {
    if (updatedModPart == null || id != updatedModPart.Id)
    {
      return BadRequest();
    }

    var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (identityUserId == null)
    {
      return Unauthorized();
    }

    var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

    if (profile == null)
    {
      return Unauthorized();
    }

    var loadedMod = _dbContext.ModParts.Include(mp => mp.Build).SingleOrDefault(mp => mp.Id == id && mp.Build.UserProfileId == profile.Id);

    if (loadedMod == null)
    {
      return NotFound();
    }

    loadedMod.Brand = updatedModPart.Brand;
    loadedMod.ModName = updatedModPart.ModName;
    loadedMod.ModType = updatedModPart.ModType;
    loadedMod.Cost = updatedModPart.Cost;
    loadedMod.InstallDate = updatedModPart.InstallDate;
    loadedMod.Link = updatedModPart.Link;
    loadedMod.Notes = updatedModPart.Notes;

    _dbContext.SaveChanges();

    return NoContent();
  }

  [HttpDelete("{id}")]
  [Authorize]
  public IActionResult DeleteModPart(int id)
  {
    var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (identityUserId == null)
    {
      return Unauthorized();
    }

    var profile = _dbContext.UserProfiles
        .SingleOrDefault(up => up.IdentityUserId == identityUserId);

    if (profile == null)
    {
      return Unauthorized();
    }

    var modPart = _dbContext.ModParts.Include(mp => mp.Build).SingleOrDefault(mp => mp.Id  == id && mp.Build.UserProfileId == profile.Id);

    if (modPart == null)
    {
      return NotFound();
    }

    _dbContext.ModParts.Remove(modPart);
    _dbContext.SaveChanges();

    return NoContent();
  }

}
