using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiN9PG.Models.package
{
    public class CreatePackDto
    {
        public string? Nameplan { get; set; }
        public string? Description { get; set; }
        public string? Features { get; set; }
        public string? Code { get; set; }
        public string? Status { get; set; }
        public decimal? Trialdays { get; set; }
        public decimal? Timedays { get; set; }
        public decimal? Cost { get; set; }
        public IFormFile Image { get; set; } // File upload

    }
}