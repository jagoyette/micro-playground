using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PatientService.Controllers
{
    using Microsoft.Extensions.Logging;
    using Models;
    using Services;

    [Route("api/patients")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly PatientDataService _patientService;

        public PatientsController(ILogger<PatientsController> logger, PatientDataService patientService)
        {
            this._logger = logger;
            this._patientService = patientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            _logger.LogDebug("API - GetPatients: Retrieving all patients");
            return await _patientService.Get();
        }

        [HttpGet]
        public async Task<ActionResult<Patient>> GetPatient(string uuid)
        {
            _logger.LogDebug("API - GetPatient: Retrieving patients {uuid}");
            return await _patientService.Get(uuid);
        }

        [HttpPost]
        public async Task<ActionResult> CreatePatient(PatientInfo patientInfo)
        {
            _logger.LogDebug($"API - CreatePatient: Creating new patient for {patientInfo.FirstName} {patientInfo.LastName}");
            return Ok(await _patientService.Create(patientInfo));
        }
    }
}