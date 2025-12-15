using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiN9PG.Data;
using ApiN9PG.Dtos;
using ApiN9PG.Models.member;
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
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;
        /**The line private readonly IWebHostEnvironment _env; is used to access environment-specific information in an ASP.NET Core application. It provides details like:
        Environment name (e.g., Development, Production, Staging)
        Content root path (root of the application)
        Web root path (for static files like CSS, JS, images)***/
        private readonly IWebHostEnvironment _env; // handle image
        private readonly ILogger<MembersController> _logger;  // this is to use messages by console, like console.log in Javascript

        public MembersController(
            AppDbContext context, 
            IWebHostEnvironment env,
            ILogger<MembersController> logger
            ){
            
            _context=context;
            _env = env; // handle image
            _logger = logger; // this is to use messages by console, like console.log
      
        }

        // GET:api/members
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers(){

         var members = await _context.Members.ToListAsync();

        // Log the results (e.g., first product's ImagePath)
        if (members.Any())
        {
        _logger.LogInformation("I am at MembersController - line 53 - at GetMembers - members[0].ImageUser: {Image}", members[0].ImageUser);
        }
        else
        { _logger.LogInformation("No Trainers found in the database.");}
            return Ok(members);
        }
        // GET: api/members/5
        [HttpGet("get-single-trainer/{id}")]
        public async Task<ActionResult<Member>> GetMember(int id){
            var member = await _context.Members.FindAsync(id);
            if(member == null){ return NotFound();}
             _logger.LogInformation("I am at MembersController - line 67 - get-single-member/{id} - member : " + member );
            return Ok(member);
        }
    /// <param name="email">The email of the member to retrieve.</param>
    /// <returns>The member if found; otherwise, 404 Not Found.</returns>
    [HttpGet("get-single-memberbyemail")]
    public async Task<IActionResult> GetByEmail([FromQuery] string email)
    {
     _logger.LogInformation("Iam at members.controller- get-single-memberbyemail - line 75 - email: " +  email);
        
    if (string.IsNullOrEmpty(email))
           { return BadRequest("Email is required.");}
    var memberByEmail = await _context.Members
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Email == email); 
     _logger.LogInformation("Iam at members.controller- get-single-memberbyemail - line 80 - memberByEmail: " +  memberByEmail);
    return memberByEmail == null ? NotFound() : Ok(memberByEmail);
    }


        // POST: api/member/create
        [HttpPost("createMember")]
        [Consumes("multipart/form-data")] // Required for file uploads
        public async Task<ActionResult<Member>> CreateMember([FromForm] CreateMemberDto dto){
         _logger.LogInformation("I am at MembersController - line 76 - CreateMember - dto.Email : " + dto.Email );

           var MemberExist = await _context.Members.AnyAsync(u => u.Email == dto.Email);
         
            if (MemberExist == true){
             _logger.LogInformation("I am at MembersController - line 80 - CreateMembers - MemberExist == null : " + MemberExist );
            var message = "Member exist .. Choose Another Email To Create a New One .. ";
            return Ok(new { Message = message } );}

        _logger.LogInformation("I am at MembersController - line 84 - CreateMember - MemberExist : " + MemberExist );

         // Get current date
        DateTime currentDate = DateTime.Now;
        
        // Add timedays to current date
        // Convert decimal to double for AddDays
        DateTime futureDate = currentDate.AddDays((double)dto.Timedays.Value);
    
        // Calculate days between dates
        double leftdays = (futureDate - currentDate).TotalDays;
        var Status = "true";


        
            var member = new Member
        {
              Namemember =  dto.Namemember,
              Client_CI =   dto.Client_CI,
              Email =       dto.Email,             
              Phone =       dto.Phone,             
              Nameplan =    dto.Nameplan,          
              Timedays =    dto.Timedays,
              Cost =        dto.Cost,
              Code =        dto.Code,
              Status=       Status,               
              ImageUser =   dto.ImageUser,
              Leftdays =    leftdays,
              CreateAt =    DateTime.UtcNow,
              FinishAt =    futureDate.ToUniversalTime()
        };

            _context.Members.Add(member);
            await _context.SaveChangesAsync();
             _logger.LogInformation("Iam at Members.Controller - line 118 - at create-Member - members: " + member);
            return Ok(new { id=member.Id,member});
        }
    
        // PUT: api/Members/5
        [HttpPut("update-member/{id}")]
    public async Task<IActionResult> UpdateTrainer(int id, [FromForm] UpdateMemberDto dto)
    {
         _logger.LogInformation("Iam at Members.Controller - line 126 - at UpdateMember - dto.Email: " + dto.Email);
        var member = await _context.Members.FindAsync(id);
        if (member == null)
            return NotFound();

        // Map DTO to entity
              member.Nameplan =   dto.Nameplan;
              member.Namemember = dto.Namemember;
              member.Client_CI  = dto.Client_CI;
              member.Email  =     dto.Email;             
              member.Phone  =     dto.Phone;             
              member.Nameplan  =  dto.Nameplan;          
              member.Timedays  =  dto.Timedays;
              member.Cost  =      dto.Cost;
              member.Code  =      dto.Code;
              member.Status  =    dto.Status;            
              member.ImageUser =  dto.ImageUser;
              member.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }
        
        //DELETE api/trainers/5
        [HttpDelete("delete-member/{id}")]
        public async Task<IActionResult> DeleteMember(int id){
            var member=await _context.Members.FindAsync(id);
            if(member==null){ return NotFound();}

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    /** function to delete pack image in wwwroot/uploads folder***/
     [HttpPost("DeleteImage")]
     public IActionResult DeleteImage([FromForm]string image)
    {
          _logger.LogInformation("Iam at Members.controller- deleteImage - line 164 - imageName: " + image);
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
                 _logger.LogInformation("Iam at Members.controller- deleteImage - line 177 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at Members.controller- deleteImage - line 181 - message: " + messageNotFound);
            return Ok(messageNotFound);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    
    }
}}