using HonkaiHub.Model;
using Microsoft.Extensions.Options;

namespace HonkaiHub.Services
{
    public class GameVersionService
    {
        private VersionsOptions _vo;

        public int DaysInVersion => _vo.DaysInVersion;

        public GameVersionService(IOptionsMonitor<VersionsOptions> options)
        {
            _vo = options.CurrentValue;
            options.OnChange(newOptions => _vo = newOptions);
        }

        private GameVersion? GetCurrentVersionFromKnown(DateTime now)
        {
            var vers = _vo.KnownVersionStarts;

            for (int i = 1; i < vers.Count; i++)
                if (now >= vers[i - 1] && now < vers[i])
                    return new GameVersion(vers[i-1], vers[i]);

            return null;
        }

        // handles start values outside of known ones
        private GameVersion GetUnknownVersionStart(DateTime from)
        {
            var vers = _vo.KnownVersionStarts;

            var lastVer = vers[^1];
            while(true)
            {
                var end = lastVer.AddDays(_vo.DaysInVersion);
                if (from <= end)
                    return new GameVersion(lastVer, end);

                lastVer = end;
            }
        }

        public GameVersion GetVersion(DateTime from)
        {
            var ver = GetCurrentVersionFromKnown(from);
            if (ver != null)
                return ver;

            return GetUnknownVersionStart(from);
        }

        public int GetMaintenancesCount(GameVersion currentVersion, DateTime to)
        {
            int index = -1;
            for(int i = 0; i < _vo.KnownVersionStarts.Count; i++)
                if (currentVersion.Start == _vo.KnownVersionStarts[i])
                {
                    index = i;
                    break;
                }

            int count = 0;
            DateTime current;
            if (index != -1)
            {
                current = _vo.KnownVersionStarts[index];

                for (; index < _vo.KnownVersionStarts.Count - 1; index++)
                {
                    var end = _vo.KnownVersionStarts[index + 1];
                    if (to >= end)
                        count++;
                    else
                        return count;

                    current = end;
                }
            }
            else
            {
                return ((to - currentVersion.Start).Days - 1) / _vo.DaysInVersion;
            }

            return count + ((to - current).Days - 1) / _vo.DaysInVersion;

        }
    }
}
