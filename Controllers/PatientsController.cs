using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PatientService.Controllers
{
    using Models;
    using Services;

    [Route("api/patients")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly PatientDataService _patientService;

        public PatientsController(PatientDataService patientService)
        {
            this._patientService = patientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _patientService.Get();
        }

        [HttpPost]
        public async Task<ActionResult> CreatePatient(PatientInfo patientInfo)
        {

            return Ok(await _patientService.Create(patientInfo));
        }
    }
}