namespace HonkaiCalc.Model
{
    public class CalculatorRewardTotal
    {
        public int GrandTotal { get; }
        public int Expansion { get; }
        public int ExpansionRemainder { get; }
        public int Focused { get; }
        public int FocusedRemainder { get; }
        public int Elf { get; }
        public int ElfRemainder { get; }
        public int Sp { get; }
        public int SpRemainder { get; }
        public int Dorm { get; }
        public int DormRemainder { get; }

        public CalculatorRewardTotal(
            int grandTotal, int expansion, int expansionRemainder,
            int focused, int focusedRemainder, int elf,
            int elfRemainder, int sp, int spRemainder,
            int dorm, int dormRemainder)
        {
            GrandTotal = grandTotal;
            Expansion = expansion;
            ExpansionRemainder = expansionRemainder;
            Focused = focused;
            FocusedRemainder = focusedRemainder;
            Elf = elf;
            ElfRemainder = elfRemainder;
            Sp = sp;
            SpRemainder = spRemainder;
            Dorm = dorm;
            DormRemainder = dormRemainder;
        }
    }
}
