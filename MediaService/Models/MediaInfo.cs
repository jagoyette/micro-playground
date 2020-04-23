using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MediaService.Models
{
    public class MediaInfo
    {
       [BsonRepresentation(BsonType.ObjectId)]
        public string PatientUuid { get; set; }

        public string Filename { get; set; }

        public string Filetype { get; set; }
    }
    
}