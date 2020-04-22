using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PatientService.Controllers
{
    [Route("api/patients")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Patient>>> GetPatients()
        {
            var patients = new List<Models.Patient>
            {
                new Models.Patient
                {
                    Uuid = "gew",
                    LastName = "G",
                    FirstName = "F",
                    PatientId = "GF-231"
                }
            };

            return Ok(patients);
            
            // return await Task<IEnumerable<Models.Patient>>.Delay(100).ContinueWith(t =>
            // {
            //     return patients;
            // });
        }

        [HttpPost]
        public async Task<ActionResult> CreatePatient(Models.PatientInfo patientInfo)
        {
            var patient = new Models.Patient
            {
                FirstName = patientInfo.FirstName,
                LastName = patientInfo.LastName,
                PatientId = patientInfo.PatientId
            };
            patient.Uuid = System.Guid.NewGuid().ToString();

            return Ok(patient);
        }
    }
}