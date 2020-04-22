using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using PatientService.Models;

namespace PatientService.Services
{
    public class PatientDataService
    {
        private readonly IMongoCollection<Patient> _patients;

        public PatientDataService(IPatientDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _patients = database.GetCollection<Patient>(settings.PatientCollectionName);
        }

        public async Task<List<Patient>> Get() =>
            (await _patients.FindAsync(p => true)).ToList();

        public async Task<Patient> Get(string uuid) =>
            (await _patients.FindAsync<Patient>(patient => patient.Uuid == uuid)).FirstOrDefault();

        public async Task<Patient> Create(PatientInfo patientInfo)
        {
            // Create a Patient model from the PatientInfo
            var patient = new Models.Patient
            {
                Uuid =  MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
                FirstName = patientInfo.FirstName,
                LastName = patientInfo.LastName,
                PatientId = patientInfo.PatientId
            };

            await _patients.InsertOneAsync(patient);
            return patient;
        }

        public async void Update(string uuid, Patient patientIn) =>
            await _patients.ReplaceOneAsync(patient => patient.Uuid == uuid, patientIn);

        public async void Remove(Patient patientIn) =>
            await _patients.DeleteOneAsync(patient => patient.Uuid == patientIn.Uuid);

        public async void Remove(string uuid) =>
            await _patients.DeleteOneAsync(patient => patient.Uuid == uuid);
    }
}