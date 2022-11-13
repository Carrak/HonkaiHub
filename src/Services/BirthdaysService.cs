using HonkaiCalc.Model;
using Microsoft.Extensions.Options;

namespace HonkaiCalc.Services
{
    public class BirthdaysService
    {
        private IReadOnlyList<DateTime> _birthdays;
        private int _lastCheckedDay;
        private IReadOnlyList<CharacterBirthday> _rawBirthdays;

        public BirthdaysService(IOptionsMonitor<CharacterBirthdaysOptions> birthdays)
        {
            _lastCheckedDay = DateTime.UtcNow.Day;
            _rawBirthdays = birthdays.CurrentValue.List;
            UpdateBirthdays();

            birthdays.OnChange(newBirthdays =>
            {
                _rawBirthdays = newBirthdays.List;
                UpdateBirthdays();
            });
        }

        private void UpdateBirthdays()
        {
            DateTime now = DateTime.UtcNow;
            List<DateTime> birthdays = new();

            foreach (var rawbd in _rawBirthdays)
            {
                var bd = new DateTime(now.Year, rawbd.Month, rawbd.Day);
                if (now > bd)
                    bd = new DateTime(now.Year + 1, rawbd.Month, rawbd.Day);

                birthdays.Add(bd);
            }

            birthdays.Sort();
            _birthdays = birthdays.AsReadOnly();
        }

        public int GetBirthdaysCount(DateTime from, DateTime to)
        {
            if (_lastCheckedDay != DateTime.UtcNow.Day)
            {
                UpdateBirthdays();
                _lastCheckedDay = DateTime.UtcNow.Day;
            }

            int sum = 0;
            foreach (var bd in _birthdays)
                if (bd > from && bd <= to)
                    sum++;

            return sum;
        }
    }
}
