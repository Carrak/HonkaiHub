using HonkaiHub.Model;
using Microsoft.Extensions.Options;

namespace HonkaiHub.Services
{
    public class BirthdaysService
    {
        private IReadOnlyList<CharacterBirthday> _rawBirthdays;

        public BirthdaysService(IOptionsMonitor<CharacterBirthdaysOptions> birthdays)
        {
            _rawBirthdays = birthdays.CurrentValue.List;

            birthdays.OnChange(newBirthdays =>
            {
                _rawBirthdays = newBirthdays.List;
            });
        }

        public int GetBirthdaysCount(DateTime from, DateTime to)
        {
            int sum = 0;

            int yearDiff = to.Year - from.Year;
            if (yearDiff == 0)
            {
                foreach (var rbd in _rawBirthdays)
                {
                    var date = new DateTime(from.Year, rbd.Month, rbd.Day);
                    if (date > from && date <= to)
                        sum++;
                }
            }
            else
            {
                sum += (yearDiff - 1) * _rawBirthdays.Count;

                foreach (var rbd in _rawBirthdays)
                {
                    var date1 = new DateTime(from.Year, rbd.Month, rbd.Day);
                    if (date1 > from)
                        sum++;

                    var date2 = new DateTime(to.Year, rbd.Month, rbd.Day);
                    if (date2 <= to)
                        sum++;
                }
            }

            return sum;
        }
    }
}
