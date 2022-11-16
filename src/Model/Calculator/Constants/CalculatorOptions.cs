namespace HonkaiHub.Model
{
    public class CalculatorOptions
    {
        [ConfigurationKeyName("breakthrough_lvl")]
        public int BreakthroughLvl { get; init; }

        [ConfigurationKeyName("dailies")]
        public int DailiesReward { get; init; }
        [ConfigurationKeyName("armada")]
        public int ArmadaReward { get; init; }
        [ConfigurationKeyName("maintenance")]
        public int MaintenanceReward { get; init; }
        [ConfigurationKeyName("hyperion_lounge")]
        public int HyperionLoungeReward { get; init; }
        [ConfigurationKeyName("survey")]
        public int SurveyReward { get; init; }
        [ConfigurationKeyName("weekly_share")]
        public int WeeklyShareReward { get; init; }
        [ConfigurationKeyName("character_birthday")]
        public int CharacterBirthdayReward { get; init; }

        [ConfigurationKeyName("monthly_card")]
        public int MonthlyCardDailyReward { get; init; }
        [ConfigurationKeyName("monthly_card_bonus")]
        public int MonthlyCardBonus { get; init; }
        [ConfigurationKeyName("monthly_card_days_bonus")]
        public int MonthlyCardDaysToBonus { get; init; }
        [ConfigurationKeyName("bp_avg_exp_daily")]
        public int BpAverageExpDaily { get; init; }
        [ConfigurationKeyName("bp_exp_per_level")]
        public int BpExpPerLevel { get; init; }

        [ConfigurationKeyName("expansion_price")]
        public int ExpansionCardPrice { get; init; }
        [ConfigurationKeyName("focused_price")]
        public int FocusedCardPrice { get; init; }
        [ConfigurationKeyName("dorm_price")]
        public int DormCardPrice { get; init; }
        [ConfigurationKeyName("sp_price")]
        public int SpCardPrice { get; init; }
        [ConfigurationKeyName("elf_price")]
        public int ElfCardPrice { get; init; }

        [ConfigurationKeyName("sign_in")]
        public ConditionedRewardContainer SignInRewards { get; init; }

        [ConfigurationKeyName("vanguard")]
        public ConditionedRewardContainer VanguardRewards { get; init; }
        [ConfigurationKeyName("knight")]
        public ConditionedRewardContainer KnightRewards { get; init; }

        [ConfigurationKeyName("ex_arena")]
        public ConditionedRewardContainer EXArenaRewards { get; init; }
        [ConfigurationKeyName("arena")]
        public ConditionedRewardContainer ArenaRewards { get; init; }

        [ConfigurationKeyName("abyss")]
        public IReadOnlyDictionary<string, int> AbyssRewards { get; init; }
        [ConfigurationKeyName("elysian_realm")]
        public IReadOnlyDictionary<string, int> ElysianRealmRewards { get; init; }
    }
}