using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiN9PG.Data;
using ApiN9PG.Dtos;
using ApiN9PG.Models.trainer;
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
    public class TrainersController : ControllerBase
    {
        private readonly AppDbContext _context;
        /**The line private readonly IWebHostEnvironment _env; is used to access environment-specific information in an ASP.NET Core application. It provides details like:
        Environment name (e.g., Development, Production, Staging)
        Content root path (root of the application)
        Web root path (for static files like CSS, JS, images)***/
        private readonly IWebHostEnvironment _env; // handle image
        private readonly ILogger<TrainersController> _logger;  // this is to use messages by console, like console.log in Javascript

        public TrainersController(
            AppDbContext context, 
            IWebHostEnvironment env,
            ILogger<TrainersController> logger
            ){
            
            _context=context;
            _env = env; // handle image
            _logger = logger; // this is to use messages by console, like console.log
      
        }

        // GET:api/trainers
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<Trainer>>> GetTrainers(){

         var trainers = await _context.Trainers.ToListAsync();

        // Log the results (e.g., first product's ImagePath)
        if (trainers.Any())
        {
        _logger.LogInformation("I am at TrainersController - line 53 - at GetTrainers - trainers[0].Image: {Image}", trainers[0].Image);
        }
        else
        {
        _logger.LogInformation("No Trainers found in the database.");
          }
            return Ok(trainers);
        }

        // GET: api/trainers/5
        [HttpGet("get-single-trainer/{id}")]
        public async Task<ActionResult<Trainer>> GetTrainer(int id){
            var trainer=await _context.Trainers.FindAsync(id);
            if(trainer==null){ return NotFound();}
             _logger.LogInformation("I am at TrainersController - line 67 - get-single-trainer/{id} - trainer : " + trainer );
            return Ok(trainer);
        }

        // POST: api/trainers/create
        [HttpPost("createTrainer")]
        [Consumes("multipart/form-data")] // Required for file uploads
        public async Task<ActionResult<Trainer>> CreateTrainer([FromForm] CreateTrainerDto dto){
         _logger.LogInformation("I am at TrainersController - line 76 - CreateTrainer - dto.Email : " + dto.Email );

         var TrainerExist = await _context.Trainers.AnyAsync(u => u.Email == dto.Email);
            
            if (TrainerExist == true){
             _logger.LogInformation("I am at TrainersController - line 80 - CreateTrainer - TrainerExist == null : " + TrainerExist );
            var message = "Trainer exist .. Choose Another Email To Create a New One .. ";
            return Ok(new { Message = message } );}

        _logger.LogInformation("I am at TrainersController - line 84 - CreateTrainer - TrainerExist : " + TrainerExist );
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

         _logger.LogInformation("I am at Trainers.Controller - line 112 - at create-trainer - uniqueFileName: " + uniqueFileName);

            var trainer = new Trainer
        {
              Name =      dto.Name,
              Email =     dto.Email,
              Age =       dto.Age,
              Id_card =   dto.Id_card,
              Phone =     dto.Phone,
              Address =   dto.Address,
              Gender =    dto.Gender, 
              Field =     dto.Field,
              Image =     "/uploads/" + uniqueFileName,
              CreateAt = DateTime.UtcNow
        };

            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();
             _logger.LogInformation("Iam at Trainers.Controller - line 130 - at create-trainer - trainer: " + trainer);
            return Ok(new { id=trainer.Id,trainer});
        }
    
        // PUT: api/trainers/5
        [HttpPut("update-trainer/{id}")]
    public async Task<IActionResult> UpdateTrainer(int id, [FromForm] UpdateTrainerDto dto)
    {
         _logger.LogInformation("Iam at Trainers.Controller - line 138 - at UpdateTrainer - dto.Email: " + dto.Email);
        var trainer = await _context.Trainers.FindAsync(id);
        if (trainer == null)
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
              trainer.Name =    dto.Name;
              trainer.Email  =  dto.Email;
              trainer.Age  =    dto.Age;
              trainer.Id_card = dto.Id_card;
              trainer.Phone  =  dto.Phone;
              trainer.Address = dto.Address;
              trainer.Gender  = dto.Gender;
              trainer.Field   = dto.Field;
              trainer.Image   = "/uploads/" + uniqueFileName;
              trainer.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }
        
        //DELETE api/trainers/5
        [HttpDelete("delete-trainer/{id}")]
        public async Task<IActionResult> DeleteTrainer(int id){
             _logger.LogInformation("Iam at Trainers.Controller - line 189 - at DeleteTrainer - id: " + id);
            var trainer=await _context.Trainers.FindAsync(id);
            if(trainer==null){ return NotFound();}

            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    /** function to delete pack image in wwwroot/uploads folder***/
     [HttpPost("DeleteImage")]
     public IActionResult DeleteImage([FromForm]string image)
    {
          _logger.LogInformation("Iam at Trainers.controller- deleteImage - line 201 - imageName: " + image);
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
                 _logger.LogInformation("Iam at Trainers.controller- deleteImage - line 214 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at Trainers.controller- deleteImage - line 218 - message: " + messageNotFound);
            return Ok(messageNotFound);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    
    }
}}