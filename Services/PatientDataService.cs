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

        public async Task<Patient> Get(string id) =>
            (await _patients.FindAsync<Patient>(patient => patient.Uuid == id)).FirstOrDefault();

        public async Task<Patient> Create(Patient patient)
        {
            await _patients.InsertOneAsync(patient);
            return patient;
        }

        public async void Update(string id, Patient patientIn) =>
            await _patients.ReplaceOneAsync(patient => patient.Uuid == id, patientIn);

        public async void Remove(Patient patientIn) =>
            await _patients.DeleteOneAsync(patient => patient.Uuid == patientIn.Uuid);

        public async void Remove(string id) =>
            await _patients.DeleteOneAsync(patient => patient.Uuid == id);

    }
}