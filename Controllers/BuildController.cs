using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModForgeFS.Data;
using Microsoft.EntityFrameworkCore;
using ModForgeFS.Models;
using ModForgeFS.Models.DTOs;

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


}
