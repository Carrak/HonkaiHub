namespace HonkaiCalc.Model
{
    public class CharacterBirthday
    {
        [ConfigurationKeyName("name")]
        public string Name { get; init; }
        [ConfigurationKeyName("month")]
        public int Month { get; init; }
        [ConfigurationKeyName("day")]
        public int Day { get; init; }
    }
}
