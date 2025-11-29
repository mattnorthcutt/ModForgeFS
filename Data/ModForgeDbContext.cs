using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ModForgeFS.Models;
using Microsoft.AspNetCore.Identity;

namespace ModForgeFS.Data;
public class ModForgeDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Build> Builds { get; set; }
        public DbSet<ModPart> ModParts { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ModTag> ModTags { get; set; }

    public ModForgeDbContext(DbContextOptions<ModForgeDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
            CreateDateTime = new DateTime(2022, 1, 25)
        });

        modelBuilder.Entity<Build>().HasData(
            new Build
            {
                Id = 1,
                VehicleName = "2014 Mustang GT",
                ImageLocation = "https://placehold.co/600x400",
                Goal = "Street performance",
                Status = "In Progress",
                StartDate = new DateTime(2025, 10, 1),
                Budget = 5000m,
                Notes = "Intake, exhaust, tune first.",
                CreatedAt = new DateTime(2025, 10, 1),
                UserProfileId = 1
            },
            new Build
            {
                Id = 2,
                VehicleName = "2006 Yamaha R6",
                ImageLocation = "https://placehold.co/600x400",
                Goal = "Track ready",
                Status = "Planned",
                StartDate = new DateTime(2025, 11, 10),
                Budget = 3500m,
                Notes = "Suspension and braking upgrades.",
                CreatedAt = new DateTime(2025, 11, 10),
                UserProfileId = 1
            }
        );

        modelBuilder.Entity<ModPart>().HasData(
            new ModPart
            {
                Id = 1,
                BuildId = 1,
                Brand = "K&N",
                ModName = "Cold Air Intake",
                ModType = "Intake",
                Cost = 379.99m,
                InstallDate = new DateTime(2025, 10, 5),
                Link = "https://example.com/intake",
                Notes = "Better throttle response.",
                CreatedAt = new DateTime(2025, 10, 5)
            },
            new ModPart
            {
                Id = 2,
                BuildId = 1,
                Brand = "Borla",
                ModName = "Cat-back Exhaust",
                ModType = "Exhaust",
                Cost = 1299.00m,
                InstallDate = new DateTime(2025, 10, 20),
                Link = "https://example.com/exhaust",
                Notes = "Deep tone, minimal drone.",
                CreatedAt = new DateTime(2025, 10, 20)
            },
            new ModPart
            {
                Id = 3,
                BuildId = 2,
                Brand = "Öhlins",
                ModName = "Rear Shock",
                ModType = "Suspension",
                Cost = 999.00m,
                InstallDate = new DateTime(2025, 11, 15),
                Link = "https://example.com/shock",
                Notes = "Track baseline setup.",
                CreatedAt = new DateTime(2025, 11, 15)
            }
        );

        modelBuilder.Entity<Tag>().HasData(
            new Tag { Id = 1, Name = "Performance" },
            new Tag { Id = 2, Name = "Cosmetic" },
            new Tag { Id = 3, Name = "Reliability" },
            new Tag { Id = 4, Name = "Track" }
        );

        modelBuilder.Entity<ModTag>().HasData(
            new ModTag { Id = 1, ModPartId = 1, TagId = 1 },
            new ModTag { Id = 2, ModPartId = 2, TagId = 1 },
            new ModTag { Id = 3, ModPartId = 3, TagId = 1 },
            new ModTag { Id = 4, ModPartId = 3, TagId = 4 }
        );

    }  
}
