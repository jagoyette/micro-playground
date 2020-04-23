namespace PatientService.Models
{

    public interface IPatientDatabaseSettings
    {
        string PatientCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
    
    public class PatientDatabaseSettings : IPatientDatabaseSettings
    {
        public string PatientCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

}