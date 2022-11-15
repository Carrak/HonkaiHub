import { Component, Fragment } from "react";
import { Divider, Grid} from "@mui/material";
import Balance, { IBalanceState } from './calculator/Balance';
import DateInputs, { IDateInputsState } from './calculator/DateInputs';
import Settings, { ISettingsState } from './calculator/Settings';
import RewardTotal from "./calculator/RewardTotal";
import CustomRewards, { ICustomRewardsState } from "./calculator/CustomRewards";
import RewardBreakdown from "./calculator/RewardBreakdown";
import { ICheckmarksState } from "./calculator/Checkmarks";

interface ICalculatorProps {

}

interface ICalculatorState {
    total: ICalculatorTotal
    breakdown: ICalculatorBreakdown
}

interface ICalculatorValues {
    customRewards: ICustomRewardsState | null
    balance: IBalanceState | null
    dates: IDateInputsState | null
    settings: ISettingsState | null
    checkmarks: ICheckmarksState | null
}

interface ICalculatorTotal {
    readonly grandTotal: number
    readonly expansion: number
    readonly expansionRemainder: number
    readonly focused: number
    readonly focusedRemainder: number
    readonly elf: number
    readonly elfRemainder: number
    readonly sp: number
    readonly spRemainder: number
    readonly dorm: number
    readonly dormRemainder: number
}

interface ICalculatorBreakdown {
    readonly current: number
    readonly custom: number
    readonly dailies: number
    readonly signIn: number
    readonly armada: number
    readonly abyss: number
    readonly elysianRealm: number
    readonly maintenance: number
    readonly extras: number
    readonly monthlyCard: number
    readonly bp: number
    readonly arena: number
    readonly birthdays: number
    readonly weeklyShare: number
}

class Calculator extends Component<ICalculatorProps, ICalculatorState> {
    values: ICalculatorValues

    constructor(props: ICalculatorProps) {
        super(props)

        this.values = {
            customRewards: null,
            balance: null,
            dates: null,
            settings: null,
            checkmarks: null
        }

        this.state = {
            total: {
                grandTotal: 0,
                expansion: 0,
                expansionRemainder: 0,
                focused: 0,
                focusedRemainder: 0,
                elf: 0,
                elfRemainder: 0,
                sp: 0,
                spRemainder: 0,
                dorm: 0,
                dormRemainder: 0
            },
            breakdown: {
                current: 0,
                custom: 0,
                dailies: 0,
                signIn: 0,
                armada: 0,
                abyss: 0,
                elysianRealm: 0,
                maintenance: 0,
                extras: 0,
                monthlyCard: 0,
                bp: 0,
                arena: 0,
                birthdays: 0,
                weeklyShare: 0
            }
        }

        this.updateCustomRewards = this.updateCustomRewards.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
        this.updateDates = this.updateDates.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.updateCheckmarks = this.updateCheckmarks.bind(this)
        this.getCalculatorResponse = this.getCalculatorResponse.bind(this)
    }

    componentDidMount() {
        document.title = "Crystal Calculator"
        this.showCat(window.innerWidth)
        window.addEventListener("resize", () => this.showCat(window.innerWidth))

        this.getCalculatorResponse()
    }  

    showCat(width: number) {
        console.log(width)
        if (width >= 900) {
            document.body.style.backgroundImage = "url(\"/CAT.png\")"
            document.body.style.backgroundRepeat = "no-repeat"
            document.body.style.backgroundPosition = "left 53vw top 10vh"
            document.body.style.backgroundSize = "1100px"
            document.body.style.backgroundAttachment = "fixed"
        }
        else
        {
            document.body.style.backgroundImage = ""
            document.body.style.backgroundRepeat = ""
            document.body.style.backgroundPosition = ""
            document.body.style.backgroundSize = ""
            document.body.style.backgroundAttachment = ""
        }
    }

    updateCustomRewards(state: ICustomRewardsState, update: boolean) {
        this.values.customRewards = state
        if (update) this.getCalculatorResponse()
    }

    updateBalance(state: IBalanceState, update: boolean) {
        this.values.balance = state
        if (update) this.getCalculatorResponse()
    }

    updateDates(state: IDateInputsState, update: boolean) {
        this.values.dates = state
        if (update) this.getCalculatorResponse()
    }

    updateSettings(state: ISettingsState, update: boolean) {
        this.values.settings = state
        if (update) this.getCalculatorResponse()
    }

    updateCheckmarks(state: ICheckmarksState, update: boolean) {
        this.values.checkmarks = state
        if (update) this.getCalculatorResponse()
    }

    getCalculatorResponse() {
        if (this.values.dates?.valueFrom == null ||
            this.values.dates?.valueTo == null ||
            this.values.dates?.versionFrom == null ||
            this.values.settings?.level == null ||
            (this.values.settings.level >= 70 && this.values.settings?.abyss == null) ||
            this.values.settings.realm == null ||
            this.values.settings.signIn == null ||
            this.values.settings.bpLevel == null ||
            this.values.settings.bpThisVersion == null ||
            this.values.settings.bpFutureVersions == null
            )
            return;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var custom = this.values.customRewards?.rewards.filter(x => x.currency != null && x.amount != null).map(rwrd => ({
            Amount: rwrd.amount,
            Currency: rwrd.currency
        }));

        let raw = JSON.stringify({
            From:                  this.values.dates.valueFrom,
            To:                    this.values.dates.valueTo,
            VersionFrom:           this.values.dates.versionFrom,
            BalanceCrystals:       this.values.balance?.crystals ?? 0,
            BalanceExpansionCards: this.values.balance?.expansion ?? 0,
            BalanceFocusedCards:   this.values.balance?.focused ?? 0,
            BalanceElfCards:       this.values.balance?.elf ?? 0,
            BalanceSpCards:        this.values.balance?.sp ?? 0,
            BalanceDormCards:      this.values.balance?.dorm ?? 0,
            Level:                 this.values.settings.level,
            AbyssTier:             this.values.settings.abyss,
            ElysianRealmDiff:      this.values.settings.realm,
            SignInDays:            this.values.settings.signIn,
            BpLevel:               this.values.settings.bpLevel,
            BpThisVersion:         this.values.settings.bpThisVersion,
            BpFutureVersions:      this.values.settings.bpFutureVersions,
            MonthlyCardDays:       this.values.settings.monthlyDays ?? 0,
            MonthlyCardDaysBonus:  this.values.settings.monthlyDaysBonus ?? 0,
            UsedStreamCodes:       this.values.checkmarks?.usedCodes ?? false,
            FilledSurvey:          this.values.checkmarks?.filledSurvey ?? false,
            CustomRewards:         custom ?? []
        })

        var options = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch("https://honkaihub.com/api/calc", options)
        fetch("https://api.honkaihub.com/calc", options)
            .then(res => res.json())
            .then(res => this.setState(res))
            .catch(err => console.log(err));
    }

    render() {
        return <Fragment>
            <Grid paddingLeft={2} paddingRight={2} container className="content">
                <Grid item xs={12} md={3.7}>
                    <Grid container columnSpacing={2.5} rowSpacing={1}>
                        <Grid item xs={12}><DateInputs updateDates={this.updateDates} /></Grid>
                        <Grid item xs={6}><Settings updateSettings={this.updateSettings} /></Grid>
                        <Grid item xs={6}><Balance updateCheckmarks={this.updateCheckmarks} updateBalance={this.updateBalance} /></Grid>
                        <Grid item xs={12}><CustomRewards updateCustomRewards={this.updateCustomRewards}/></Grid>
                    </Grid>
                </Grid>
                <Grid item md={0.5} display="flex" justifyContent="center">
                    <Divider orientation="vertical" sx={{ backgroundColor: "#FFFFFF", borderRightWidth: '2px' }} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" rowSpacing={2}>
                        <Grid item paddingLeft={2} paddingRight={2}>
                            <RewardTotal totals={this.state.total} />
                        </Grid>
                        <Grid item>
                            <RewardBreakdown breakdown={this.state.breakdown}/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Fragment>
    }
}

export type { ICalculatorTotal, ICalculatorBreakdown }
export default Calculator;