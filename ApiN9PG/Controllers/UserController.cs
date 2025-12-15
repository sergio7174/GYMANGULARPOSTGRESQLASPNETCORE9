using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiN9PG.Data;
using ApiN9PG.Dtos;
using ApiN9PG.Models;
using ApiN9PG.Models.users;
using ApiN9PG.Services;
/*You must install the Microsoft.AspNetCore.JsonPatch.SystemTextJson package to leverage System.Text.Json. The legacy Newtonsoft.Json-based implementation is still available but the SystemTextJson package is aligned with modern .NET practices and provides improved performance and reduced memory usage.
Purpose: This library provides support for HTTP PATCH requests, allowing you to perform partial updates to resources by defining a set of operations (add, remove, replace, etc.) in a JsonPatchDocument<T>*/
using Microsoft.AspNetCore.JsonPatch;
/*the necessary Microsoft.AspNetCore.Mvc assemblies are implicitly referenced via the shared framework. You do not need to install a separate NuGet package for the basic MVC functionality itself.
You will need to include the using Microsoft.AspNetCore.Mvc; directive in your controller files to access these classes and other MVC-specific features like attributes (e.g., [HttpGet], [HttpPost], [ProducesResponseType]). */
using Microsoft.AspNetCore.Mvc;
/*Entity Framework (EF) Core: The core library provided by Microsoft that enables .NET developers to work with a database using .NET objects, eliminating most data access code.*/
using Microsoft.EntityFrameworkCore;

// Controllers/AuthController.cs

using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;


namespace ApiN9PG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    { 
        private readonly IWebHostEnvironment _env; // handle image
        private readonly IConfiguration _configuration;
        private readonly TokenService _tokenService;
        private readonly AppDbContext _context;
        private readonly ILogger<UsersController> _logger;  // this is to use messages by console, like console.log in Javascript


      public UsersController(
        AppDbContext context, 
        IConfiguration configuration, 
        TokenService tokenService,
        IWebHostEnvironment env, 
        ILogger<UsersController> logger
        )
      { 
        _context=context;
        _configuration = configuration;
        _tokenService = tokenService;
        _env = env; // handle image
        _logger = logger; // this is to use messages by console, like console.log
      }

        // GET:api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(){
            return await _context.Users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id){
            var user=await _context.Users.FindAsync(id);
            if(user==null){
                return NotFound();
            }
            return user;
        }

        // GET: api/users/GetOneAdmin
        // function to get at leat One Admin
    [HttpGet("getoneadmin")]
    public async Task<IActionResult> GetOneAdmin()
    
    {   
        //var isAdmin = User.Claims
    //.FirstOrDefault(c => c.Type == ClaimTypes.Role && c.Value == "true")?.Value;
        var isAdmin = "true";
        //var Admin = await  _context.Users.FindAsync(isAdmin);
       var Admin = await  _context.Users.AnyAsync(u => u.IsAdmin == isAdmin); 
     _logger.LogInformation("I am at AuthController - GetOneAdmin - line 80 - Admin: " + Admin);   
        if (Admin == null)
{   //_logger.LogInformation("I am at AuthController - GetOneAdmin - line 104");
    //_logger.LogInformation("I am at AuthController - GetOneAdmin - line 105 - Admin: " + Admin);
    return Ok(new { admin = Admin });
}
else
{
    _logger.LogInformation("I am at AuthController - GetOneAdmin - line 86 - Admin: " + Admin);
    
    return Ok(new { admin = Admin }); // Or return the appropriate result
}
        
    }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> CreateUser([FromForm]CreateUserDto dto){
         _logger.LogInformation("I am at AuthController - register - line 100 - dto.FullName : " + dto.FullName);
         if (dto == null) { return BadRequest("DTO is null. Check request body.");}
         if (!ModelState.IsValid) { return BadRequest(ModelState);}

        if (dto.Image == null)
            return BadRequest("Image is required.");
        // Validate file type and size if needed
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        var fileExtension = Path.GetExtension(dto.Image.FileName).ToLower();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
        }

        // Generate a unique filename to avoid conflicts
        var uniqueFileName = Guid.NewGuid().ToString() + fileExtension;
        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads"); // Use WebRootPath

        // Ensure the directory exists
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // Save the file
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await dto.Image.CopyToAsync(fileStream);
        }
         
            var user=new User{
                FullName = dto.FullName,
                Email = dto.Email,
                Password = dto.Password,
                Image = "/uploads/" + uniqueFileName,
                IsAdmin = dto.IsAdmin,
                CreatedAt=DateTime.UtcNow,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser),new { id=user.Id},user);
        }
    
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            _logger.LogInformation("Iam at User.Controller - line 150 - at login");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);
            if (user == null) return Unauthorized();

            var token = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(user.Id);

            return Ok(new { token, user,refreshToken });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenModel model)
        {
            var refreshToken = _tokenService.GetRefreshToken(model.RefreshToken);
            if (refreshToken == null)
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == refreshToken.UserId);
            if (user == null) return Unauthorized();

            var newAccessToken = _tokenService.GenerateAccessToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken(user.Id);

            // Revoke the old refresh token
            _tokenService.RevokeRefreshToken(refreshToken.RefreshUserToken);

            return Ok(new { accessToken = newAccessToken, refreshToken = newRefreshToken });
        }


        // PUT: api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user){
            if(id!=user.Id){
                return BadRequest();
            }

            user.UpdatedAt=DateTime.UtcNow;
            _context.Entry(user).State=EntityState.Modified;
            _context.Entry(user).Property(x=>x.CreatedAt).IsModified=false;

            try{
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException){
                if(!UserExist(id)){
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }
        private bool UserExist(int id){
            return _context.Users.Any(p=>p.Id==id);
        }

        // PATCH: api/products/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUser(int id, [FromBody] JsonPatchDocument<User> patchDoc){
            if(patchDoc==null){
                return BadRequest();
            }

            var user=await _context.Users.FindAsync(id);
            if(user==null){
                return NotFound();
            }

            patchDoc.ApplyTo(user);
            
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            user.UpdatedAt=DateTime.UtcNow;

            try{
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException){

                if(!UserExist(id)){
                    return NotFound();
                }
                throw;
            }

            return NoContent();
                
            
        }
    
        //DELETE api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id){
            var user=await _context.Users.FindAsync(id);
            if(user==null){
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}