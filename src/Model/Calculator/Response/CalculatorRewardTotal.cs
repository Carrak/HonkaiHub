namespace HonkaiHub.Model
{
    public class CalculatorRewardTotal
    {
        public int GrandTotal { get; }
        public int Expansion { get; }
        public int Focused { get; }
        public int Elf { get; }
        public int Sp { get; }
        public int Dorm { get; }

        public CalculatorRewardTotal(
            int grandTotal, int expansion,
            int focused, int elf,
            int sp,
            int dorm)
        {
            GrandTotal = grandTotal;
            Expansion = expansion;
            Focused = focused;
            Elf = elf;
            Sp = sp;
            Dorm = dorm;
        }
    }
}
