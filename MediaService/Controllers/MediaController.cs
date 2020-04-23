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
            _logger.LogInformation($"getting all media for patient {patientUuid}");

            var mediaFiles = await _mediaDataService.Get();

            return Ok(mediaFiles);
        }
    }
}