using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MediaService.Models;

namespace MediaService.Services
{
    public class MediaDataService
    {
        private readonly ILogger _logger;
        private readonly IMongoCollection<Media> _mediaCollection;

        public MediaDataService(ILogger<MediaDataService> logger, IDatabaseSettings settings)
        {
            _logger = logger;
            _logger.LogInformation($"Creating Media Data service with Connection: {settings.ConnectionString}");

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _mediaCollection = database.GetCollection<Media>(settings.CollectionName);
        }

        public async Task<List<Media>> Get() =>
            (await _mediaCollection.FindAsync(p => true)).ToList();

        public async Task<Media> Get(string uuid) =>
            (await _mediaCollection.FindAsync<Media>(m => m.Uuid == uuid)).FirstOrDefault();

        public async Task<Media> Create(Media media)
        {
            await _mediaCollection.InsertOneAsync(media);
            return media;
        }

        public async void Update(string uuid, Media mediaIn) =>
            await _mediaCollection.ReplaceOneAsync(media => media.Uuid == uuid, mediaIn);

        public async void Remove(Media mediaIn) =>
            await _mediaCollection.DeleteOneAsync(media => media.Uuid == mediaIn.Uuid);

        public async void Remove(string uuid) =>
            await _mediaCollection.DeleteOneAsync(media => media.Uuid == uuid);
    }
}