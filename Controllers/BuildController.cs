using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModForgeFS.Data;
using Microsoft.EntityFrameworkCore;
using ModForgeFS.Models;
using ModForgeFS.Models.DTOs;
using System.Security.Claims;

namespace ModForgeFS.Controllers;

[ApiController]
[Route("api/[controller]")]

public class BuildController : ControllerBase
{
  
private ModForgeDbContext _dbContext;

  public BuildController(ModForgeDbContext context)
  {
    _dbContext = context;
  }

  [HttpGet("mybuilds")]
  [Authorize]
  public IActionResult GetMyBuilds()
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

    var builds = _dbContext.Builds.Where(b => b.UserProfileId == profile.Id).Select(b => new BuildDTO
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

    return Ok(builds);
  }

  [HttpGet("{id}")]
  [Authorize]
  public IActionResult GetBuild(int id)
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

    var build = _dbContext.Builds.Include(b => b.ModParts).ThenInclude(mp => mp.ModTags).ThenInclude(mt => mt.Tag).SingleOrDefault(b => b.Id == id);

      if (build == null)
    {
      return NotFound();
    }

    if (build.UserProfileId == profile.Id) return Ok(build);
    if (build.IsPublic) return Ok(build);

    return Unauthorized();
  }

  [HttpGet("public")]
  [Authorize]
  public IActionResult GetPublicBuilds()
  {
    var builds = _dbContext.Builds.Where(b => b.IsPublic).OrderByDescending(b => b.Id).ToList();

    return Ok(builds);
  }

  [HttpPut("{id}/visibility")]
  [Authorize]
  public IActionResult UpdateVisibility(int id, [FromBody] bool isPublic)
  {
    var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (identityUserId == null) return Unauthorized();

    var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
    if (profile == null) return Unauthorized();

    var build = _dbContext.Builds.SingleOrDefault(b => b.Id == id && b.UserProfileId == profile.Id);
    if (build == null) return NotFound();

    build.IsPublic = isPublic;
    _dbContext.SaveChanges();

    return NoContent();
  }

  [HttpPost]
  [Authorize]
  public IActionResult CreateBuild(Build build)
  {
    if (build == null)
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

    build.Id = 0;
    build.UserProfileId = profile.Id;
    build.CreatedAt = DateTime.Now;

    _dbContext.Builds.Add(build);
    _dbContext.SaveChanges();

    return Created($"/api/build/{build.Id}", build);
  }

  [HttpPut("{id}")]
  [Authorize]
  public IActionResult UpdateBuild(int id, Build updatedBuild)
  {
      if (updatedBuild == null || id != updatedBuild.Id)
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

      var existingBuild = _dbContext.Builds.SingleOrDefault(b => b.Id == id && b.UserProfileId == profile.Id);

      if (existingBuild == null)
      {
        return NotFound();
      }

      existingBuild.VehicleName = updatedBuild.VehicleName;
      existingBuild.ImageLocation = updatedBuild.ImageLocation;
      existingBuild.Goal = updatedBuild.Goal;
      existingBuild.Status = updatedBuild.Status;
      existingBuild.StartDate = updatedBuild.StartDate;
      existingBuild.Budget = updatedBuild.Budget;
      existingBuild.Notes = updatedBuild.Notes;

      _dbContext.SaveChanges();
      return NoContent();
  }

  [HttpDelete("{id}")]
  [Authorize]
  public IActionResult DeleteBuild(int id)
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

    var build = _dbContext.Builds.SingleOrDefault(b => b.Id == id && b.UserProfileId == profile.Id);

    if (build == null)
    {
      return NotFound();
    }

    _dbContext.Builds.Remove(build);
    _dbContext.SaveChanges();

    return NoContent();
  }

  
}
