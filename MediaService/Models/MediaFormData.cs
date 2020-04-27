using Microsoft.AspNetCore.Http;

namespace MediaService.Models
{
    public class MediaFormData
    {
        public string PatientUuid {get; set;}

        public string FileName { get; set; }

        public string ContentType { get; set; }
        
        public IFormFile FileInfo {get; set;}
    }
}