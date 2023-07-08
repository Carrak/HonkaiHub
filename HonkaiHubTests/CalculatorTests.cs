using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using HonkaiHub;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using HonkaiHub.Services;
using HonkaiHub.Model;

namespace CalculatorTests
{
    [TestClass]
    public class CalculatorTests
    {
        private readonly CalculatorResponse _result1;
        private readonly CalculatorResponse _result2;
        private readonly CalculatorResponse _result3;

        #region full tests
        // from start of one version to start of next version
        // monthly card: claimed 5 days of 30 = 25*60 + 500*2 = 2500
        // sign-in: missed 3 days (can only claim up to 31-3=28 days, missing the reward on 29th) = 600 - 50 = 550
        // bp: lvl 15, claimed 120 from vanguard (lvls 10 and 15) and 180 from knight (lvl 10) = 540+720-120-180 = 960
        private static readonly CalculatorParams _cp1 = new()
        {
            From = new DateTime(2022, 10, 27),
            To = new DateTime(2022, 12, 8),
            Level = 88,
            AbyssTier = "ex_redlotus",
            ElysianRealmDiff = "abstinence",
            SignInDays = 24,
            BpLevel = 15,
            BpThisVersion = Battlepass.KnightPaladin,
            BpFutureVersions = Battlepass.Vanguard,
            MonthlyCardDays = 25,
            MonthlyCardDaysBonus = 5,
            CompletedAbyssMissions = false,
            CustomRewards = new List<CustomReward>()
            {
                new CustomReward()
                {
                    Amount = 10,
                    Currency = Currency.Focused
                },
                new CustomReward()
                {
                    Amount = 20,
                    Currency = Currency.Expansion
                },
                new CustomReward()
                {
                    Amount = 250,
                    Currency = Currency.Crystals
                }
            }
        };

        // 0 days, all except custom rewards and balance must be 0
        // custom rewards must be summed up with themselves and balance
        private static readonly CalculatorParams _cp2 = new()
        {
            From = new DateTime(2022, 10, 27),
            To = new DateTime(2022, 10, 27),
            Level = 88,
            AbyssTier = "ex_redlotus",
            ElysianRealmDiff = "abstinence",
            SignInDays = 24,
            BpLevel = 15,
            BalanceCrystals = 100,
            BalanceExpansionCards = 10,
            BalanceFocusedCards = 1,
            BalanceDormCards = 1,
            BalanceElfCards = 1,
            BalanceSpCards = 1,
            BpThisVersion = Battlepass.KnightPaladin,
            BpFutureVersions = Battlepass.Vanguard,
            MonthlyCardDays = 25,
            MonthlyCardDaysBonus = 5,
            CompletedAbyssMissions = false,
            CustomRewards = new List<CustomReward>()
            {
                new CustomReward()
                {
                    Amount = 10,
                    Currency = Currency.Focused
                },
                new CustomReward()
                {
                    Amount = 1,
                    Currency = Currency.Dorm
                },
                new CustomReward()
                {
                    Amount = 2,
                    Currency = Currency.Dorm
                },
                new CustomReward()
                {
                    Amount = 2,
                    Currency = Currency.Sp
                },
                new CustomReward()
                {
                    Amount = 3,
                    Currency = Currency.Sp
                },
                new CustomReward()
                {
                    Amount = 3,
                    Currency = Currency.Elf
                },
                new CustomReward()
                {
                    Amount = 4,
                    Currency = Currency.Elf
                },
                new CustomReward()
                {
                    Amount = 20,
                    Currency = Currency.Expansion
                },
                new CustomReward()
                {
                    Amount = 15,
                    Currency = Currency.Expansion
                },
                new CustomReward()
                {
                    Amount = 250,
                    Currency = Currency.Crystals
                },
                new CustomReward()
                {
                    Amount = 300,
                    Currency = Currency.Crystals
                }
            }
        };

        // 2 full versions, up to second Monday of 2nd version
        // abyss: completed missions
        // bp: vanguard this version, knight in the next, full other versions
        // 2 full monthly cards
        private static readonly CalculatorParams _cp3 = new()
        {
            From = new DateTime(2022, 10, 27),
            To = new DateTime(2023, 1, 23),
            Level = 88,
            AbyssTier = "ex_redlotus",
            ElysianRealmDiff = "abstinence",
            SignInDays = 27,
            BpLevel = 0,
            BpThisVersion = Battlepass.Vanguard,
            BpFutureVersions = Battlepass.KnightPaladin,
            MonthlyCardDays = 60,
            MonthlyCardDaysBonus = 0,
            CompletedAbyssMissions = true
        };
        #endregion full tests

        public CalculatorTests()
        {
            var services = new ServiceCollection();
            var config = new ConfigurationManager();

            config.AddJsonFile("birthdays.json", false, true);
            config.AddJsonFile("constants.json", false, true);
            config.AddJsonFile("versions.json", false, true);

            services.AddSingleton<CalculatorService>();
            services.AddSingleton<BirthdaysService>();
            services.AddSingleton<GameVersionService>();

            services.Configure<CalculatorOptions>(config.GetSection("CalcOptions"));
            services.Configure<CharacterBirthdaysOptions>(config.GetSection("BirthdaysOptions"));
            services.Configure<VersionsOptions>(config.GetSection("Versions"));

            ServiceProvider sp = services.BuildServiceProvider();

            _result1 = sp.GetService<CalculatorService>()!.Calculate(_cp1);
            _result2 = sp.GetService<CalculatorService>()!.Calculate(_cp2);
            _result3 = sp.GetService<CalculatorService>()!.Calculate(_cp3);
        }

        #region _result1
        [TestMethod, TestCategory("Total"), TestCategory("Result1")]
        public void GrandTotal_InResult1_ShouldBe_17470() => Assert.AreEqual(17470, _result1.Total.GrandTotal);

        [TestMethod, TestCategory("Total"), TestCategory("Result1")]
        public void Focused_InResult1_ShouldBe_10() => Assert.AreEqual(10, _result1.Total.Focused);

        [TestMethod, TestCategory("Total"), TestCategory("Result1")]
        public void Expansion_InResult1_ShouldBe_20() => Assert.AreEqual(20, _result1.Total.Expansion);

        [TestMethod, TestCategory("Total"), TestCategory("Result1")]
        public void Elf_InResult1_ShouldBe_0() => Assert.AreEqual(0, _result1.Total.Elf);

        [TestMethod, TestCategory("Total"), TestCategory("Result1")]
        public void Sp_InResult1_ShouldBe_0() => Assert.AreEqual(0, _result1.Total.Sp);

        [TestMethod, TestCategory("Total"), TestCategory("Result1")]
        public void Dorm_InResult1_ShouldBe_0() => Assert.AreEqual(0, _result1.Total.Dorm);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Abyss_InResult1_ShouldBe_6000() => Assert.AreEqual(6000, _result1.Breakdown.Abyss);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void ElysianRealm_InResult1_ShouldBe_3000() => Assert.AreEqual(3000, _result1.Breakdown.ElysianRealm);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Dailies_InResult1_ShouldBe_1680() => Assert.AreEqual(1680, _result1.Breakdown.Dailies);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void SignIn_InResult1_ShouldBe_550() => Assert.AreEqual(550, _result1.Breakdown.SignIn);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void MonthlyCard_InResult1_ShouldBe_2500() => Assert.AreEqual(2500, _result1.Breakdown.MonthlyCard);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Bp_InResult1_ShouldBe_960() => Assert.AreEqual(960, _result1.Breakdown.Bp);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Maintenance_InResult1_ShouldBe_600() => Assert.AreEqual(600, _result1.Breakdown.Maintenance);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void StreamsSurveys_InResult1_ShouldBe_400() => Assert.AreEqual(400, _result1.Breakdown.StreamsSurveys);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Arena_InResult1_ShouldBe_840() => Assert.AreEqual(840, _result1.Breakdown.Arena);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Armada_InResult1_ShouldBe_150() => Assert.AreEqual(150, _result1.Breakdown.Armada);

        // Elysia, Eden, Kiana
        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Birthdays_InResult1_ShouldBe_360() => Assert.AreEqual(360, _result1.Breakdown.Birthdays);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void WeeklyShare_InResult1_ShouldBe_180() => Assert.AreEqual(180, _result1.Breakdown.WeeklyShare);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void Current_InResult1_ShouldBe_0() => Assert.AreEqual(0, _result1.Breakdown.Current);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result1")]
        public void CustomRewards_InResult1_ShouldBe_250() => Assert.AreEqual(250, _result1.Breakdown.Custom);
        #endregion _result1

        #region _result2
        [TestMethod, TestCategory("Total"), TestCategory("Result2")]
        public void GrandTotal_InResult2_ShouldBe_650() => Assert.AreEqual(650, _result2.Total.GrandTotal);

        [TestMethod, TestCategory("Total"), TestCategory("Result2")]
        public void Focused_InResult2_ShouldBe_11() => Assert.AreEqual(11, _result2.Total.Focused);

        [TestMethod, TestCategory("Total"), TestCategory("Result2")]
        public void Expansion_InResult2_ShouldBe_45() => Assert.AreEqual(45, _result2.Total.Expansion);

        [TestMethod, TestCategory("Total"), TestCategory("Result2")]
        public void Elf_InResult2_ShouldBe_8() => Assert.AreEqual(8, _result2.Total.Elf);

        [TestMethod, TestCategory("Total"), TestCategory("Result2")]
        public void Sp_InResult2_ShouldBe_6() => Assert.AreEqual(6, _result2.Total.Sp);

        [TestMethod, TestCategory("Total"), TestCategory("Result2")]
        public void Dorm_InResult2_ShouldBe_4() => Assert.AreEqual(4, _result2.Total.Dorm);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Abyss_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Abyss);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void ElysianRealm_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.ElysianRealm);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Dailies_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Dailies);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void SignIn_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.SignIn);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void MonthlyCard_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.MonthlyCard);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Bp_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Bp);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Maintenance_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Maintenance);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void StreamsSurveys_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.StreamsSurveys);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Arena_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Arena);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Armada_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Armada);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Birthdays_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.Birthdays);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void WeeklyShare_InResult2_ShouldBe_0() => Assert.AreEqual(0, _result2.Breakdown.WeeklyShare);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void Current_InResult2_ShouldBe_100() => Assert.AreEqual(100, _result2.Breakdown.Current);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result2")]
        public void CustomRewards_InResult2_ShouldBe_550() => Assert.AreEqual(550, _result2.Breakdown.Custom);
        #endregion _result2

        #region _result3
        [TestMethod, TestCategory("Total"), TestCategory("Result3")]
        public void GrandTotal_InResult3_ShouldBe_36315() => Assert.AreEqual(36315, _result3.Total.GrandTotal);

        [TestMethod, TestCategory("Total"), TestCategory("Result3")]
        public void Focused_InResult3_ShouldBe_3() => Assert.AreEqual(3, _result3.Total.Focused);

        [TestMethod, TestCategory("Total"), TestCategory("Result3")]
        public void Expansion_InResult3_ShouldBe_0() => Assert.AreEqual(0, _result3.Total.Expansion);

        [TestMethod, TestCategory("Total"), TestCategory("Result3")]
        public void Elf_InResult3_ShouldBe_0() => Assert.AreEqual(0, _result3.Total.Elf);

        [TestMethod, TestCategory("Total"), TestCategory("Result3")]
        public void Sp_InResult3_ShouldBe_0() => Assert.AreEqual(0, _result3.Total.Sp);

        [TestMethod, TestCategory("Total"), TestCategory("Result3")]
        public void Dorm_InResult3_ShouldBe_0() => Assert.AreEqual(0, _result3.Total.Dorm);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Abyss_InResult3_ShouldBe_12400() => Assert.AreEqual(12400, _result3.Breakdown.Abyss);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void ElysianRealm_InResult3_ShouldBe_6500() => Assert.AreEqual(6500, _result3.Breakdown.ElysianRealm);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Dailies_InResult3_ShouldBe_3520() => Assert.AreEqual(3520, _result3.Breakdown.Dailies);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void SignIn_InResult3_ShouldBe_1200() => Assert.AreEqual(1200, _result3.Breakdown.SignIn);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void MonthlyCard_InResult3_ShouldBe_5600() => Assert.AreEqual(5600, _result3.Breakdown.MonthlyCard);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Bp_InResult3_ShouldBe_2100() => Assert.AreEqual(2100, _result3.Breakdown.Bp);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Maintenance_InResult3_ShouldBe_1200() => Assert.AreEqual(1200, _result3.Breakdown.Maintenance);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void StreamsSurveys_InResult3_ShouldBe_800() => Assert.AreEqual(800, _result3.Breakdown.StreamsSurveys);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Arena_InResult3_ShouldBe_1540() => Assert.AreEqual(1680, _result3.Breakdown.Arena);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Armada_InResult3_ShouldBe_325() => Assert.AreEqual(325, _result3.Breakdown.Armada);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Birthdays_InResult3_ShouldBe_600() => Assert.AreEqual(600, _result3.Breakdown.Birthdays);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void WeeklyShare_InResult3_ShouldBe_390() => Assert.AreEqual(390, _result3.Breakdown.WeeklyShare);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void Current_InResult3_ShouldBe_0() => Assert.AreEqual(0, _result3.Breakdown.Current);

        [TestMethod, TestCategory("Breakdown"), TestCategory("Result3")]
        public void CustomRewards_InResult3_ShouldBe_0() => Assert.AreEqual(0, _result3.Breakdown.Custom);
        #endregion
    }
}