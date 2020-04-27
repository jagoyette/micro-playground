using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MediaService.Models
{
    public class Media
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Uuid { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string PatientUuid { get; set; }

        public string FileName { get; set; }

        public string ContentType { get; set; }

        public string Path { get; set; }
    }
    
}