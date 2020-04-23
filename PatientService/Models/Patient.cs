using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PatientService.Models
{
    public class Patient
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Uuid { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PatientId { get; set; }        
    }
    
}