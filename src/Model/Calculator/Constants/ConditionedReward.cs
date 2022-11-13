namespace HonkaiCalc.Model
{
    public class ConditionedReward
    {
        [ConfigurationKeyName("condition")]
        public int Condition { get; init; }
        [ConfigurationKeyName("reward")]
        public int Reward { get; init; }
    }
}
