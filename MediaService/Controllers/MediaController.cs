using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MediaService.Controllers
{
    using MediaService.Models;
    using MediaService.Services;

    [Route("api/media")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly MediaDataService _mediaDataService;
        
        public MediaController(ILogger<MediaController> logger, MediaDataService mediaDataService)
        {
            _logger = logger;
            _mediaDataService = mediaDataService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetMediaForPatient(string patientUuid)
        {
            _logger.LogInformation($"API GetMediaForPatient - Getting all media for patient {patientUuid}");

            return await _mediaDataService.GetMediaForPatient(patientUuid);
        }

        [HttpPost]
        public async Task<ActionResult<Media>> CreateMediaForPatient([FromForm] MediaFormData mediaFormData)
        {
            var patientUuid = mediaFormData.PatientUuid;
            var fileInfo = mediaFormData.FileInfo;

            _logger.LogInformation($"API CreateMediaForPatient - Creating for patient {patientUuid}");

            var mediaInfo = new MediaInfo
            {
                PatientUuid = patientUuid,
                Filename = mediaFormData.Filename,
                Filetype = mediaFormData.Filetype
            };

            return await _mediaDataService.CreateMediaForPatient(mediaInfo, fileInfo.OpenReadStream());
        }
    }
}