namespace HonkaiHub.Model
{
    public class GameVersion
    {
        public DateTime Start { get; }
        public DateTime End { get; }

        public GameVersion(DateTime start, DateTime end)
        {
            Start = start;
            End = end;
        }
    }
}
