namespace MediaService.Models
{

    public interface IDatabaseSettings
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string MediaStoreRootPath { get; set; }
    }
    
    public class MediaDatabaseSettings : IDatabaseSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string MediaStoreRootPath { get; set; }
    }

}