using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiN9PG.Data;
using ApiN9PG.Dtos;
using ApiN9PG.Models.package;
/*You must install the Microsoft.AspNetCore.JsonPatch.SystemTextJson package to leverage System.Text.Json. The legacy Newtonsoft.Json-based implementation is still available but the SystemTextJson package is aligned with modern .NET practices and provides improved performance and reduced memory usage.
Purpose: This library provides support for HTTP PATCH requests, allowing you to perform partial updates to resources by defining a set of operations (add, remove, replace, etc.) in a JsonPatchDocument<T>*/
using Microsoft.AspNetCore.JsonPatch;
/*the necessary Microsoft.AspNetCore.Mvc assemblies are implicitly referenced via the shared framework. You do not need to install a separate NuGet package for the basic MVC functionality itself.
You will need to include the using Microsoft.AspNetCore.Mvc; directive in your controller files to access these classes and other MVC-specific features like attributes (e.g., [HttpGet], [HttpPost], [ProducesResponseType]). */
using Microsoft.AspNetCore.Mvc;
/*Entity Framework (EF) Core: The core library provided by Microsoft that enables .NET developers to work with a database using .NET objects, eliminating most data access code.*/
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ApiN9PG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacksController : ControllerBase
    {
        private readonly AppDbContext _context;
        /**The line private readonly IWebHostEnvironment _env; is used to access environment-specific information in an ASP.NET Core application. It provides details like:
        Environment name (e.g., Development, Production, Staging)
        Content root path (root of the application)
        Web root path (for static files like CSS, JS, images)***/
        private readonly IWebHostEnvironment _env; // handle image
        private readonly ILogger<PacksController> _logger;  // this is to use messages by console, like console.log in Javascript

        public PacksController(
            AppDbContext context, 
            IWebHostEnvironment env,
            ILogger<PacksController> logger
            ){
            
            _context=context;
            _env = env; // handle image
            _logger = logger; // this is to use messages by console, like console.log
      
        }

        // GET:api/packs
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<Pack>>> GetPacks(){

         var packs = await _context.Packs.ToListAsync();

        // Log the results (e.g., first product's ImagePath)
        if (packs.Any())
        {
        _logger.LogInformation("I am at PacksController - line 53 - at GetPacks - packs[0].Image: {Image}", packs[0].Image);
        }
        else
        {
        _logger.LogInformation("No Packs found in the database.");
          }
            return Ok(packs);
        }

        // GET: api/packs/5
        [HttpGet("get-single-pack/{id}")]
        public async Task<ActionResult<Pack>> GetPack(int id){
            var pack=await _context.Packs.FindAsync(id);
            if(pack==null){ return NotFound();}
             _logger.LogInformation("I am at PacksController - line 67 - get-single-pack/{id} - pack : " + pack );
            return Ok(pack);
        }

        // POST: api/packs
        [HttpPost("create")]
        [Consumes("multipart/form-data")] // Required for file uploads
        public async Task<ActionResult<Pack>> CreatePack([FromForm] CreatePackDto dto){
         _logger.LogInformation("I am at PacksController - line 76 - CreatePack - dto.Code : " + dto.Code );

         var PackExist = await _context.Packs.AnyAsync(u => u.Code == dto.Code);
            
            if (PackExist == true){
             _logger.LogInformation("I am at PacksController - line 81 - CreatePack - PackExist == null : " + PackExist );
            var message = "Pack exist .. Choose Another Code To Create a New One .. ";
            return Ok(new { Message = message } );}

        _logger.LogInformation("I am at PacksController - line 85 - CreatePack - PackExist : " + PackExist );
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

         _logger.LogInformation("I am at Packs.Controller - line 105 - at create-pack - uniqueFileName: " + uniqueFileName);

            var pack= new Pack {
                
                Nameplan =     dto.Nameplan,
                Description =  dto.Description, 
                Features =     dto.Features,
                Code     =     dto.Code,
                Status   =     dto.Status,
                Trialdays =    dto.Trialdays,
                Timedays  =    dto.Timedays,
                Cost      =    dto.Cost,
                Image =        "/uploads/" + uniqueFileName,
                CreatedAt =    DateTime.UtcNow,
                UpdatedAt =    DateTime.UtcNow
            };

            _context.Packs.Add(pack);
            await _context.SaveChangesAsync();
             _logger.LogInformation("Iam at Packs.Controller - line 125 - at create-pack - pack: " + pack);
            return Ok(new { id=pack.Id,pack});
        }
    
        // PUT: api/packs/5
        [HttpPut("update-pack/{id}")]
    public async Task<IActionResult> UpdatePack(int id, [FromForm] UpdatePackDto dto)
    {
         _logger.LogInformation("Iam at Packs.Controller - line 139 - at UpdatePack - dto.Code: " + dto.Code);
        var pack = await _context.Packs.FindAsync(id);
        if (pack == null)
            return NotFound();

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

        // Map DTO to entity
        pack.Nameplan =    dto.Nameplan;
        pack.Description = dto.Description;
        pack.Features =    dto.Features;
        pack.Code =        dto.Code;
        pack.Status =      dto.Status;
        pack.Trialdays =   dto.Trialdays;
        pack.Timedays =    dto.Timedays;
        pack.Cost =        dto.Cost;
        pack.Image =     "/uploads/" + uniqueFileName;
        pack.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }
        
    
        //DELETE api/packs/5
        [HttpDelete("delete-pack/{id}")]
        public async Task<IActionResult> DeletePack(int id){
            var pack=await _context.Packs.FindAsync(id);
            if(pack==null){ return NotFound();}

            _context.Packs.Remove(pack);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    

    /** function to delete pack image in wwwroot/uploads folder***/
     [HttpPost("DeleteImage")]
     public IActionResult DeleteImage([FromForm]string image)
    {
          _logger.LogInformation("Iam at Packs.controller- deleteImage - line 205 - imageName: " + image);
        if ( string.IsNullOrEmpty(image))
            return BadRequest("Image name is required");

        string filename = Path.GetFileName(image); // Extracts "member-3.png"
        var filePath = Path.Combine(_env.WebRootPath, "uploads", filename);
        
        try
        {
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                var message = "Image deleted successfully";
                 _logger.LogInformation("Iam at Package.controller- deleteImage - line 218 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at Package.controller- deleteImage - line 221 - message: " + messageNotFound);
            return Ok(messageNotFound);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    
    }
}}