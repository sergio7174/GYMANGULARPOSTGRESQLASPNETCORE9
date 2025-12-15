using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiN9PG.Data;
using ApiN9PG.Models.classe;
/*You must install the Microsoft.AspNetCore.JsonPatch.SystemTextJson package to leverage System.Text.Json. The legacy Newtonsoft.Json-based implementation is still available but the SystemTextJson package is aligned with modern .NET practices and provides improved performance and reduced memory usage.
Purpose: This library provides support for HTTP PATCH requests, allowing you to perform partial updates to resources by defining a set of operations (add, remove, replace, etc.) in a JsonPatchDocument<T>*/
using Microsoft.AspNetCore.JsonPatch;
/*the necessary Microsoft.AspNetCore.Mvc assemblies are implicitly referenced via the shared framework. You do not need to install a separate NuGet package for the basic MVC functionality itself.
You will need to include the using Microsoft.AspNetCore.Mvc; directive in your controller files to access these classes and other MVC-specific features like attributes (e.g., [HttpGet], [HttpPost], [ProducesResponseType]). */
using Microsoft.AspNetCore.Mvc;
/*Entity Framework (EF) Core: The core library provided by Microsoft that enables .NET developers to work with a database using .NET objects, eliminating most data access code.*/
using Microsoft.EntityFrameworkCore;

namespace ApiN9PG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassesController : ControllerBase
    {
        private readonly AppDbContext _context;
        /**The line private readonly IWebHostEnvironment _env; is used to access environment-specific information in an ASP.NET Core application. It provides details like:
        Environment name (e.g., Development, Production, Staging)
        Content root path (root of the application)
        Web root path (for static files like CSS, JS, images)***/
        private readonly IWebHostEnvironment _env; // handle image
        private readonly ILogger<ClassesController> _logger;  // this is to use messages by console, like console.log in Javascript

        public ClassesController(
            AppDbContext context, 
            IWebHostEnvironment env,
            ILogger<ClassesController> logger
            ){
            
            _context=context;
            _env = env; // handle image
            _logger = logger; // this is to use messages by console, like console.log
      
        }

        // GET:api/classes
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<Classe>>> GetClasses(){

         var classes = await _context.Classes.ToListAsync();

        // Log the results (e.g., first product's ImagePath)
        if (classes.Any())
        {
        _logger.LogInformation("I am at ClassesController - line 53 - at GetClasses - classes[0].Image: {Image}", classes[0].Image);
        }
        else
        {
        _logger.LogInformation("No Classes found in the database.");
          }
            return Ok(classes);
        }

        // GET: api/classes/5
        [HttpGet("get-single-classe/{id}")]
        public async Task<ActionResult<Classe>> GetClasse(int id){
            var classe = await _context.Classes.FindAsync(id);
            if(classe==null){ return NotFound();}
             _logger.LogInformation("I am at ClassesController - line 67 - get-single-classe/{id} - pack : " + classe );
            return Ok(classe);
        }

        // POST: api/classes
        [HttpPost("createClass")]
        [Consumes("multipart/form-data")] // Required for file uploads
        public async Task<ActionResult<Classe>> CreateClasse([FromForm] CreateClasseDto dto){
         _logger.LogInformation("I am at ClassesController - line 73 - CreateClasse - dto.Code : " + dto.Code );

         var ClasseExist = await _context.Classes.AnyAsync(u => u.Code == dto.Code);
            
            if (ClasseExist == true){
             _logger.LogInformation("I am at PacksController - line 78 - CreatePack - PackExist == null : " + ClasseExist );
            var message = "Class exist .. Choose Another Code To Create a New One .. ";
            return Ok(new { Message = message } );}

        _logger.LogInformation("I am at ClassesController - line 82 - CreateClasse - ClasseExist : " + ClasseExist );
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
            var classe = new Classe
        {
              Classname =      dto.Classname,
              Code =           dto.Code,
              Classday =       dto.Classday,
              Classtime  =     dto.Classtime,
              Classlevel =     dto.Classlevel,
              Trainer  =       dto.Trainer,
              Key_benefits =   dto.Key_benefits,
              Expert_trainer = dto.Expert_trainer,
              Class_overview = dto.Class_overview,
              Why_matters  =   dto.Why_matters,
              DateBegin =      dto.DateBegin.ToUniversalTime(),
              DateEndClass =   DateTime.UtcNow,
              Session_time  =  dto.Session_time,
              Price   =        dto.Price,
              Image =          "/uploads/" + uniqueFileName,
              CreateAt =       DateTime.UtcNow,
              UpdatedAt =      DateTime.UtcNow,
        };
            _context.Classes.Add(classe);
            await _context.SaveChangesAsync();
             _logger.LogInformation("Iam at Classes.Controller - line 133 - at create-classe - classe: " + classe);
            return Ok(new { id=classe.Id,classe});
        }
    
        // PUT: api/classes/5
        [HttpPut("update-classe/{id}")]
    public async Task<IActionResult> UpdateClasse(int id, [FromForm] UpdateClasseDto dto)
    {
         _logger.LogInformation("Iam at Classes.Controller - line 141 - at UpdateClasses - dto.Code: " + dto.Code);
        var classe = await _context.Classes.FindAsync(id);
        if (classe == null)
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
              classe.Classname =      dto.Classname;
              classe.Code =           dto.Code;
              classe.Classday =       dto.Classday;
              classe.Classtime =      dto.Classtime;
              classe.Classlevel =     dto.Classlevel;
              classe.Trainer  =       dto.Trainer;
              classe.Key_benefits =   dto.Key_benefits;
              classe.Expert_trainer = dto.Expert_trainer;
              classe.Class_overview = dto.Class_overview;
              classe.Why_matters =    dto.Why_matters;
              classe.DateBegin =      dto.DateBegin.ToUniversalTime();
              classe.Session_time =   dto.Session_time;
              classe.Price  =         dto.Price;
              classe.Image =          "/uploads/" + uniqueFileName;
              classe.UpdatedAt =       DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }
        
    
        //DELETE api/packs/5
        [HttpDelete("delete-classe/{id}")]
        public async Task<IActionResult> DeleteClasse(int id){
            var classe = await _context.Classes.FindAsync(id);
            if(classe == null) { return NotFound();}

            _context.Classes.Remove(classe);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    

    /** function to delete pack image in wwwroot/uploads folder***/
     [HttpPost("DeleteImage")]
     public IActionResult DeleteImage([FromForm]string image)
    {
          _logger.LogInformation("Iam at Classes.controller- deleteImage - line 211 - imageName: " + image);
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
                 _logger.LogInformation("Iam at Classes.controller- deleteImage - line 224 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at Classes.controller- deleteImage - line 228 - message: " + messageNotFound);
            return Ok(messageNotFound);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    
    }
}}