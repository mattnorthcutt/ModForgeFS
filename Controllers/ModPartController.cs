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

  [HttpPut("{id}/tags")]
  [Authorize]
  public IActionResult SetTagsForModPart(int id, [FromBody] List<int> tagIds)
  {
    if (tagIds == null)
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

    var modPart = _dbContext.ModParts.Include(mp => mp.Build).SingleOrDefault(mp => mp.Id == id && mp.Build.UserProfileId == profile.Id);

    if (modPart == null)
    {
      return NotFound();
    }

    var existingModTags = _dbContext.ModTags.Where(mt => mt.ModPartId == id).ToList();

    if (existingModTags.Any())
    {
      _dbContext.ModTags.RemoveRange(existingModTags);
    }

    foreach (var tagId in tagIds)
    {
      var modTag = new ModTag
      {
        ModPartId = id,
        TagId = tagId
      };

      _dbContext.ModTags.Add(modTag);
    }

    _dbContext.SaveChanges();

    return NoContent();
  }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetModPartById(int id)
    {
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

        var mod = _dbContext.ModParts.Include(m => m.Build).Include(mp => mp.ModTags).ThenInclude(mt => mt.Tag).SingleOrDefault(m => m.Id == id && m.Build.UserProfileId == profile.Id);

        if (mod == null)
        {
            return NotFound();
        }

        return Ok(mod);
    }
}
