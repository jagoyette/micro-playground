using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MediaService.Models
{
    public class MediaInfo
    {
       [BsonRepresentation(BsonType.ObjectId)]
        public string PatientUuid { get; set; }

        public string FileName { get; set; }

        public string ContentType { get; set; }
    }
    
}