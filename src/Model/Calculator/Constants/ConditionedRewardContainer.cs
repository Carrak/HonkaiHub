namespace HonkaiCalc.Model
{
    public class ConditionedRewardContainer
    {
        [ConfigurationKeyName("rewards")]
        public IReadOnlyList<ConditionedReward> Rewards { get; init; }

        public int RewardTotal => Rewards.Sum(x => x.Reward);

        public int GetReward(int reachedValue)
        {
            int sum = 0;
            for (int i = 0; i < Rewards.Count && reachedValue >= Rewards[i].Condition; i++)
                sum += Rewards[i].Reward;
            return sum;
        }
    }
}
