using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiN9PG.Dtos
{
    public class CreateUserDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; } // Non-nullable string
        public string? FullName { get; set; }
        public string? IsAdmin { get; set; }
        public IFormFile Image { get; set; } // File upload

    }
}