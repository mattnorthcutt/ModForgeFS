using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModForgeFS.Data;
using ModForgeFS.Models;

namespace ModForgeFS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
  private readonly ModForgeDbContext _dbContext;

  public TagController(ModForgeDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  [HttpGet]
  [Authorize]
  public IActionResult GetAll()
  {
    var tags = _dbContext.Tags.OrderBy(t => t.Name).ToList();
    return Ok(tags);
  }

  [HttpGet("{id}")]
  [Authorize]
  public IActionResult GetById(int id)
  {
    var tag = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
    if (tag == null) return NotFound();
    return Ok(tag);
  }

  [HttpPost]
  [Authorize]
  public IActionResult Create(Tag tag)
  {
    if (tag == null || string.IsNullOrWhiteSpace(tag.Name))
    {
      return BadRequest();
    }

    tag.Id = 0;

    _dbContext.Tags.Add(tag);
    _dbContext.SaveChanges();

    return Created($"/api/tag/{tag.Id}", tag);
  }


  [HttpPut("{id}")]
  [Authorize]
  public IActionResult Update(int id, Tag tag)
  {
    if (tag == null || id != tag.Id)
    {
      return BadRequest();
    }

    var existing = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
    if (existing == null) return NotFound();

    existing.Name = tag.Name;

    _dbContext.SaveChanges();

    return NoContent();
  }

  [HttpDelete("{id}")]
  [Authorize]
  public IActionResult Delete(int id)
  {
    var tag = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
    if (tag == null) return NotFound();

    _dbContext.Tags.Remove(tag);
    _dbContext.SaveChanges();

    return NoContent();
  }
}
