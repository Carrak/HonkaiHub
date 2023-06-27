using HonkaiHub.Model;
using Microsoft.Extensions.Options;

namespace HonkaiHub.Services
{
    public class CalculatorService
    {
        private readonly BirthdaysService _birthdays;
        private readonly GameVersionService _gvs;
        private CalculatorOptions _co;

        public CalculatorService(IOptionsMonitor<CalculatorOptions> options, BirthdaysService birthdays, GameVersionService gvs)
        {
            _birthdays = birthdays;
            _gvs = gvs;
            _co = options.CurrentValue;
            options.OnChange(newOptions => _co = newOptions);
        }

        public CalculatorResponse Calculate(CalculatorParams cp)
        {
            var versionCurrent = _gvs.GetVersion(cp.From);
            var versionLast = _gvs.GetVersion(cp.To);

            int days = (cp.To - cp.From).Days;
            int weekdayFrom = DayOfWeek(cp.From.DayOfWeek);
            int weekdayTo = DayOfWeek(cp.To.DayOfWeek);

            int daysThisVersion = (cp.From - versionCurrent.Start).Days;
            int daysLeftThisVersion = Math.Min(days, (versionCurrent.End - cp.From).Days);
            int daysLastVersion = (cp.To - versionLast.Start).Days;

            // value for fullWeeks is -1 if "From" and "To" dates are on the same week,
            // 0 if they're on consequent weeks,
            // and a positive value if they're more than a full week apart
            int weeklyResets = (days + weekdayFrom - weekdayTo) / 7;
            int fullWeeks = weeklyResets - 1;

            // same logic explained above applies for fullVersions
            int maintenancesCount = _gvs.GetMaintenancesCount(versionCurrent, cp.To);
            int fullVersions = maintenancesCount - 1;

            var customsDict = GetCustomRewards(cp.CustomRewards);

            var breakdown = new CalculatorRewardBreakdown(
                            current: cp.BalanceCrystals,
                            custom: customsDict[Currency.Crystals],
                            dailies: GetDailiesTotal(days),
                            signIn: GetSignInTotal(cp.From, cp.To, days, cp.SignInDays),
                            armada: GetArmadaTotal(weeklyResets),
                            abyss: GetAbyssTotal(cp.AbyssTier, cp.CompletedAbyssMissions, days, weekdayFrom, weekdayTo, fullWeeks),
                            elysianRealm: GetElysianRealmTotal(weeklyResets, cp.ElysianRealmDiff),
                            maintenance: GetMaintenancesTotal(maintenancesCount),
                            extras: GetExtrasTotal(versionCurrent, versionLast, fullVersions, cp.From, cp.To),
                            monthlyCard: GetMonthlyCardTotal(days, cp.MonthlyCardDays, cp.MonthlyCardDaysBonus),
                            arena: GetArenaTotal(cp.Level, days, fullWeeks, weekdayFrom, weekdayTo),
                            bp: GetBattlePassTotal(fullVersions, cp.BpLevel, cp.BpThisVersion, cp.BpFutureVersions, daysLeftThisVersion, daysLastVersion),
                            birthdays: GetBirthdaysTotal(cp.From, cp.To),
                            weeklyShare: GetWeeklyShareTotal(weeklyResets)
                            );

            int sum = breakdown.Sum();
            int bonusFocused = GetBattlePassCards(fullVersions, cp.BpThisVersion, cp.BpLevel, daysThisVersion, daysLastVersion);

            var total = new CalculatorRewardTotal(
                grandTotal: sum,
                expansion: cp.BalanceExpansionCards + customsDict[Currency.Expansion],
                focused: cp.BalanceFocusedCards + bonusFocused + customsDict[Currency.Focused],
                elf: cp.BalanceElfCards + customsDict[Currency.Elf],
                sp: cp.BalanceSpCards + customsDict[Currency.Sp],
                dorm: cp.BalanceDormCards + customsDict[Currency.Dorm]);

            return new CalculatorResponse(breakdown, total);
        }

        private int DayOfWeek(DayOfWeek dow)
        {
            if (dow == System.DayOfWeek.Sunday)
                return 7;

            return (int)dow;
        }

        private Dictionary<Currency, int> GetCustomRewards(IEnumerable<CustomReward> customs)
        {
            var customsDict = new Dictionary<Currency, int>();
            foreach (var cr in customs)
                customsDict[cr.Currency] = customsDict.TryGetValue(cr.Currency, out int curr) ? curr + cr.Amount : cr.Amount;

            var vals = Enum.GetValues<Currency>();
            foreach (var val in vals)
                if (!customsDict.ContainsKey(val))
                    customsDict[val] = 0;

            return customsDict;
        }

        private int GetDailiesTotal(int days) => days * _co.DailiesReward;

        private int GetArmadaTotal(int weeklyResets) => weeklyResets * _co.ArmadaReward;

        private int GetElysianRealmTotal(int weeklyResets, string erDiff) => weeklyResets * _co.ElysianRealmRewards[erDiff];

        private int GetMaintenancesTotal(int maintenancesCount) => maintenancesCount * _co.MaintenanceReward;

        private int GetExtrasTotal(GameVersion currentVersion, GameVersion lastVersion, int fullVersions, DateTime from, DateTime to) 
        {
            int surveys = Math.Max(fullVersions, 0);
            int streamCodes = Math.Max(fullVersions, 0);

            // honkai lounge and surveys usually happen 6 days before a version ends

            var currVersionDate = currentVersion.End.AddDays(-6);
            if (to >= currVersionDate && from < currVersionDate)
            {
                surveys++;
                streamCodes++;
            }

            if (fullVersions > -1)
            {
                var lastVersionDate = lastVersion.End.AddDays(-6);
                if (to >= lastVersionDate)
                {
                    surveys++;
                    streamCodes++;
                }
            }    

            return surveys * _co.SurveyReward + streamCodes * _co.HyperionLoungeReward;
        }

        private int GetBirthdaysTotal(DateTime from, DateTime to) => _birthdays.GetBirthdaysCount(from, to) * _co.CharacterBirthdayReward;

        private int GetWeeklyShareTotal(int weeklyResets) => weeklyResets * _co.WeeklyShareReward;

        private int GetArenaTotal(int level, int days, int fullWeeks, int weekdayFrom, int weekdayTo)
        {
            var arenaRewards = level > _co.BreakthroughLvl ? _co.EXArenaRewards : _co.ArenaRewards;

            int claimedCurrentWeek = arenaRewards.GetReward(weekdayFrom);
            int totalCurrentWeek = arenaRewards.GetReward(weekdayFrom + days);
            int canClaimThisWeek = totalCurrentWeek - claimedCurrentWeek;

            int canClaimFinalWeek = fullWeeks > -1 ? arenaRewards.GetReward(weekdayTo) : 0;

            int fullWeeksTotal = fullWeeks > 0 ? fullWeeks * arenaRewards.RewardTotal : 0;

            return canClaimThisWeek + canClaimFinalWeek + fullWeeksTotal;
        }

        private int GetMonthlyCardTotal(int days, int monthlyCardDaysRemaining, int monthlycardDaysBonus)
        {
            int daysClaimed = Math.Min(days, monthlyCardDaysRemaining);
            int bonusIn = _co.MonthlyCardDaysToBonus - monthlycardDaysBonus;

            int bonusTimesClaimed = daysClaimed >= bonusIn ? 1 + (daysClaimed - bonusIn) / _co.MonthlyCardDaysToBonus : 0;

            return daysClaimed * _co.MonthlyCardDailyReward + bonusTimesClaimed * _co.MonthlyCardBonus;
        }

        private int GetSignInTotal(DateTime from, DateTime to, int days, int signInDaysClaimed)
        {
            int claimed = _co.SignInRewards.GetReward(signInDaysClaimed);
            int canClaim = _co.SignInRewards.GetReward(Math.Min(DateTime.DaysInMonth(from.Year, from.Month) + signInDaysClaimed - from.Day, days + signInDaysClaimed)) - claimed;

            int sum = canClaim;
            
            int monthlyResets = (to.Year - from.Year) * 12 + to.Month - from.Month;

            int i;
            for (i = 1; i < monthlyResets; i++) 
            {
                var dt = new DateTime(from.Year, from.Month, 1);
                dt = dt.AddMonths(i);
                int daysInMonth = DateTime.DaysInMonth(dt.Year, dt.Month);
                sum += _co.SignInRewards.GetReward(daysInMonth);
            }

            if (monthlyResets > 0)
                sum += _co.SignInRewards.GetReward(to.Day);

            return sum;
        }

        private int GetAbyssTotal(string abyssTier, bool completedAbyssMissions, int days, int weekdayFrom, int weekdayTo, int fullWeeks)
        {
            if (string.IsNullOrEmpty(abyssTier))
                return 0;

            int periods = 0;

            // current week
            if (weekdayFrom < 4 && days + weekdayFrom >= 4)
                periods += 1;

            // last week
            if (fullWeeks > -1)
                periods += 1 + (weekdayTo >= 4 ? 1 : 0);

            if (fullWeeks > 0)
                periods += fullWeeks * 2;

            int reward = periods * _co.AbyssRewards[abyssTier];
            if (completedAbyssMissions && periods > 0)
                reward -= 100;

            return reward;
        }

        private int GetBattlePassCards(int fullVersions, Battlepass bpThisVersion, int bpLevel, int daysThisVersion, int daysLastVersion)
        {
            int bonusFocused = fullVersions > 0 ? fullVersions : 0;
            int requiredLevelCard = bpThisVersion == Battlepass.KnightPaladin ? 6 : 16;
            if (bpLevel < requiredLevelCard)
                bonusFocused += (_co.BpAverageExpDaily * daysThisVersion / _co.BpExpPerLevel) >= requiredLevelCard ? 1 : 0;
            if (fullVersions > -1)
                bonusFocused += (_co.BpAverageExpDaily * daysLastVersion / _co.BpExpPerLevel) >= requiredLevelCard ? 1 : 0;

            return bonusFocused;
        }

        private int GetBattlePassTotal(int fullVersions, int currentBpLevel, Battlepass bpThisVersion, Battlepass bpNextVersion, int daysCurrentVersion, int daysLastVersion)
        {
            int levelThisVersion = (daysCurrentVersion * _co.BpAverageExpDaily / _co.BpExpPerLevel) + currentBpLevel;

            // this version
            int vanguardCanClaim = _co.VanguardRewards.GetReward(levelThisVersion) - _co.VanguardRewards.GetReward(currentBpLevel);
            int knightCanClaim = bpThisVersion == Battlepass.KnightPaladin ?
                _co.KnightRewards.GetReward(levelThisVersion) - _co.KnightRewards.GetReward(currentBpLevel) : 0;

            // last version
            int vanguardLastVersion = 0;
            int knightLastVersion = 0;
            if (fullVersions > -1)
            {
                int levelLastVersion = daysLastVersion * _co.BpAverageExpDaily / _co.BpExpPerLevel;
                vanguardLastVersion = _co.VanguardRewards.GetReward(levelLastVersion);
                if (bpNextVersion == Battlepass.KnightPaladin)
                    knightLastVersion = _co.KnightRewards.GetReward(levelLastVersion);
            }

            // full versions
            int vanguardFullVersions = 0;
            int knightFullVersions = 0;
            if (fullVersions > 0)
            {
                vanguardFullVersions = _co.VanguardRewards.RewardTotal * fullVersions;
                if (bpNextVersion == Battlepass.KnightPaladin)
                    knightFullVersions = _co.KnightRewards.RewardTotal * fullVersions;
            }

            return vanguardCanClaim + knightCanClaim + vanguardLastVersion + knightLastVersion + vanguardFullVersions + knightFullVersions;
        }   
    }
}
