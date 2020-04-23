using Microsoft.AspNetCore.Http;

namespace MediaService.Models
{
    public class MediaFormData
    {
        public string PatientUuid {get; set;}

        public string Filename { get; set; }

        public string Filetype { get; set; }
        
        public IFormFile FileInfo {get; set;}
    }
}