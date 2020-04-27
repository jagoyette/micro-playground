using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        private string _mediaStoreRootPath;

        public MediaDataService(ILogger<MediaDataService> logger, IDatabaseSettings settings)
        {
            _logger = logger;
            _logger.LogInformation($"Creating Media Data service with Connection: {settings.ConnectionString}");
            _logger.LogInformation($"MediaStoreRootPath: {settings.MediaStoreRootPath}");

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _mediaCollection = database.GetCollection<Media>(settings.CollectionName);
            _mediaStoreRootPath = settings.MediaStoreRootPath;

            // Make sure media path is accessible
            if (!string.IsNullOrEmpty(_mediaStoreRootPath))
            {
                _logger.LogInformation($"Verifying access to MediaStoreRootPath: {_mediaStoreRootPath}");
                // Check media store path
                var path = _mediaStoreRootPath;
                if (Directory.Exists(path))
                {
                    _logger.LogDebug($"Path {path} exists!");
                }
                else
                {
                    _logger.LogDebug($"Creating directory for media {path}");
                    Directory.CreateDirectory(path);
                }
            }
        }

        public string MediaStoreRootPath => _mediaStoreRootPath;

        
        public async Task<List<Media>> GetMediaForPatient(string patientUuid)
        {
            _logger.LogDebug($"Retrieving media for patient {patientUuid}");

            var media = await _mediaCollection.FindAsync<Media>(m => m.PatientUuid == patientUuid);
            return media.ToList();
        }

        public async Task<Media> GetMediaItem(string uuid) =>
            (await _mediaCollection.FindAsync<Media>(m => m.Uuid == uuid)).FirstOrDefault();

        public async Task<Media> CreateMediaForPatient(MediaInfo mediaInfo, Stream fileStream)
        {
            _logger.LogDebug($"Creating new media item");

            // start with an ObjectId for this media item
            var mediaUuid = MongoDB.Bson.ObjectId.GenerateNewId().ToString();

            // save the file to our media store
            var mediaPath = Path.Combine(_mediaStoreRootPath, mediaUuid + "-" + mediaInfo.Filename);
            using (var stream = new FileStream(mediaPath, FileMode.Create))
            {
                fileStream.CopyTo(stream);
            }

            _logger.LogDebug($"Media item saved to {mediaPath}");

            var media = new Media
            {
                Uuid =  mediaUuid,
                PatientUuid = mediaInfo.PatientUuid,
                Filename = mediaInfo.Filename,
                Filetype = mediaInfo.Filetype,
                MediaUrl = mediaPath
            };

            await _mediaCollection.InsertOneAsync(media);
            return media;
        }

        public async Task<Stream> GetMediaStream(string uuid)
        {
            var mediaItem = await GetMediaItem(uuid);
            if (mediaItem != null)
            {
                var mediaPath = Path.Combine(_mediaStoreRootPath, uuid + "-" + mediaItem.Filename);
                return new FileStream(mediaPath, FileMode.Open);
            }

            return null;
        }

        public async void Update(string uuid, Media mediaIn) =>
            await _mediaCollection.ReplaceOneAsync(media => media.Uuid == uuid, mediaIn);

        public async void Remove(Media mediaIn) =>
            await _mediaCollection.DeleteOneAsync(media => media.Uuid == mediaIn.Uuid);

        public async void Remove(string uuid) =>
            await _mediaCollection.DeleteOneAsync(media => media.Uuid == uuid);
    }
}