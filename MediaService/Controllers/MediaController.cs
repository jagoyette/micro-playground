using System.Net.Cache;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
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
        private readonly IWebHostEnvironment _webHostEnvironment;
        
        public MediaController(ILogger<MediaController> logger, MediaDataService mediaDataService, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _mediaDataService = mediaDataService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetMediaForPatient(string patientUuid)
        {
            _logger.LogInformation($"API GetMediaForPatient - Getting all media for patient {patientUuid}");

            var medias = await _mediaDataService.GetMediaForPatient(patientUuid);
            return medias;
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