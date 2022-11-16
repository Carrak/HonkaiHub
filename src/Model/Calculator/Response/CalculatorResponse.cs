namespace HonkaiHub.Model
{
    public class CalculatorResponse
    {
        public CalculatorRewardBreakdown Breakdown { get; }
        public CalculatorRewardTotal Total { get; }

        public CalculatorResponse(CalculatorRewardBreakdown rewardBreakdown, CalculatorRewardTotal total)
        {
            Breakdown = rewardBreakdown;
            Total = total;
        }
    }
}
