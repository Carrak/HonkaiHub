namespace HonkaiCalc.Model
{
    public class CharacterBirthdaysOptions
    {
        [ConfigurationKeyName("Birthdays")]
        public IReadOnlyList<CharacterBirthday> List { get; init; }
    }
}
