namespace HonkaiHub
{
    public class CalculatorParams
    {
        public DateTime From { get; init; }
        public DateTime To { get; init; }

        public DateTime VersionFrom { get; init; }

        public int BalanceCrystals { get; init; }
        public int BalanceExpansionCards { get; init; }
        public int BalanceFocusedCards { get; init; }
        public int BalanceElfCards { get; init; }
        public int BalanceSpCards { get; init; }
        public int BalanceDormCards { get; init; }

        public int Level { get; init; }
        public string AbyssTier { get; init; }
        public string ElysianRealmDiff { get; init; }
        public int SignInDays { get; init; }
        public int BpLevel { get; init; }
        public Battlepass BpThisVersion { get; init; }
        public Battlepass BpFutureVersions { get; init; }

        public int MonthlyCardDays { get; init; }
        public int MonthlyCardDaysBonus { get; init; }

        public bool UsedStreamCodes { get; init; }
        public bool FilledSurvey { get; init; }
        public bool BoughtBpFocusedCard { get; init; }

        public IReadOnlyList<CustomReward> CustomRewards { get; init; }
    }

    public class CustomReward
    {
        public int Amount { get; init; }
        public Currency Currency { get; init; }
    }

    public enum Battlepass
    {
        Vanguard,
        KnightPaladin
    }

    public enum Currency
    {
        Crystals,
        Expansion,
        Focused,
        Elf,
        Sp,
        Dorm
    }
}
