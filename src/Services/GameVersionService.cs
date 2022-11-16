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

        private int GetCurrentVersionIndex(DateTime now)
        {
            var vers = _vo.KnownVersionStarts;

            for (int i = 1; i < vers.Count; i++)
                if (now >= vers[i - 1] && now < vers[i])
                    return i - 1;

            return -1;
        }

        // handles start values outside of known ones
        private DateTime GetUnknownVersionStart(DateTime from)
        {
            var vers = _vo.KnownVersionStarts;

            var lastVer = vers[^1];
            while(true)
            {
                var end = lastVer.AddDays(_vo.DaysInVersion);
                if (from <= end)
                    return lastVer;

                lastVer = end;
            }
        }

        public DateTime GetCurrentVersionStart(DateTime from)
        {
            var index = GetCurrentVersionIndex(from);
            if (index != -1)
                return _vo.KnownVersionStarts[index];

            return GetUnknownVersionStart(from);
        }

        public int GetMaintenancesCount(DateTime currentVersionStart, DateTime to)
        {
            int index = -1;
            for(int i = 0; i < _vo.KnownVersionStarts.Count; i++)
                if (currentVersionStart == _vo.KnownVersionStarts[i])
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
                    if (to > end)
                        count++;
                    else
                        return count;

                    current = end;
                }
            }
            else
            {
                return ((to - currentVersionStart).Days - 1) / _vo.DaysInVersion;
            }

            return count + ((to - current).Days - 1) / _vo.DaysInVersion;

        }
    }
}
