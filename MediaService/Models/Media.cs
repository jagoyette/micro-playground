using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MediaService.Models
{
    public class Media
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Uuid { get; set; }

        public string Filename { get; set; }

        public string Filetype { get; set; }

    }
    
}