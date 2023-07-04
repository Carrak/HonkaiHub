namespace HonkaiHub.Model
{
    public class CalculatorRewardBreakdown
    {
        public int Current { get; }
        public int Custom { get; }
        public int Dailies { get; }
        public int SignIn { get; }
        public int Armada { get; }
        public int Abyss { get; }
        public int ElysianRealm { get; }
        public int Maintenance { get; }
        public int StreamsSurveys { get; }
        public int MonthlyCard { get; }
        public int Bp { get; }
        public int Arena { get; }
        public int Birthdays { get; }
        public int WeeklyShare { get; }

        public CalculatorRewardBreakdown(int current, int custom, int dailies, int signIn, int armada, 
            int abyss, int elysianRealm, int maintenance, int streamsSurveys, int monthlyCard, 
            int bp, int arena, int birthdays, int weeklyShare)
        {
            Current = current;
            Custom = custom;
            Dailies = dailies;
            SignIn = signIn;
            Armada = armada;
            Abyss = abyss;
            ElysianRealm = elysianRealm;
            Maintenance = maintenance;
            StreamsSurveys = streamsSurveys;
            MonthlyCard = monthlyCard;
            Bp = bp;
            Arena = arena;
            Birthdays = birthdays;
            WeeklyShare = weeklyShare;
        }

        public int Sum() => Current + Custom + Dailies + SignIn + Armada + Abyss + ElysianRealm + Maintenance + StreamsSurveys + MonthlyCard + Bp + Arena + Birthdays + WeeklyShare;
    }
}
