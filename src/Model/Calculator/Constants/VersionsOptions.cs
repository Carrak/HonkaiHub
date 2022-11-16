namespace HonkaiHub.Model
{
    public class VersionsOptions
    {
        [ConfigurationKeyName("known_versions")]
        public IReadOnlyList<DateTime> KnownVersionStarts { get; init; }
        [ConfigurationKeyName("days_version")]
        public int DaysInVersion { get; init; }
    }
}
