import { Component, Fragment } from "react";
import { Divider, Grid} from "@mui/material";
import Balance, { IBalanceState } from './calculator/Balance';
import DateInputs, { IDateInputsState } from './calculator/DateInputs';
import Settings, { ISettingsState } from './calculator/Settings';
import RewardTotal from "./calculator/RewardTotal";
import CustomRewards, { ICustomReward } from "./calculator/CustomRewards";
import RewardBreakdown from "./calculator/RewardBreakdown";
import { ICheckmarksState } from "./calculator/Checkmarks";

interface ICalculatorProps {

}

interface ICalculatorState {
    total: ICalculatorTotal
    breakdown: ICalculatorBreakdown
}

interface ICalculatorValues {
    customRewards: ICustomReward[] | null
    balance: IBalanceState | null
    dates: IDateInputsState | null
    settings: ISettingsState | null
    checkmarks: ICheckmarksState | null
}

interface ICalculatorTotal {
    readonly grandTotal: number
    readonly expansion: number
    readonly focused: number
    readonly elf: number
    readonly sp: number
    readonly dorm: number
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
                focused: 0,
                elf: 0,
                sp: 0,
                dorm: 0,
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
        if (width >= 900) {
            document.body.style.backgroundImage = "url(\"/CAT.png\")"
            document.body.style.backgroundRepeat = "no-repeat"
            document.body.style.backgroundPosition = "left max(55vw, 900px) top 100px"
            document.body.style.backgroundSize = "900px"
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

    updateCustomRewards(newRewards: ICustomReward[], update: boolean) {
        this.values.customRewards = newRewards
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
            this.values.settings?.level == null ||
            (this.values.settings.level >= 70 && this.values.settings?.abyss == null) ||
            this.values.settings.realm == null ||
            this.values.settings.bpLevel == null ||
            this.values.settings.bpThisVersion == null ||
            this.values.settings.bpFutureVersions == null
            )
            return;

        var headers = new Headers()
        headers.append("Content-Type", "application/json")

        var custom = this.values.customRewards?.map(rwrd => ({
            Amount: rwrd.amount,
            Currency: rwrd.currency
        }))

        let raw = JSON.stringify({
            From:                   this.values.dates.valueFrom.format('YYYY-MM-DDTHH:mm:ss'),
            To:                     this.values.dates.valueTo.format('YYYY-MM-DDTHH:mm:ss'),
            BalanceCrystals:        this.values.balance?.crystals ?? 0,
            BalanceExpansionCards:  this.values.balance?.expansion ?? 0,
            BalanceFocusedCards:    this.values.balance?.focused ?? 0,
            BalanceElfCards:        this.values.balance?.elf ?? 0,
            BalanceSpCards:         this.values.balance?.sp ?? 0,
            BalanceDormCards:       this.values.balance?.dorm ?? 0,
            Level:                  this.values.settings.level,
            AbyssTier:              this.values.settings.abyss,
            ElysianRealmDiff:       this.values.settings.realm,
            BpLevel:                this.values.settings.bpLevel,
            BpThisVersion:          this.values.settings.bpThisVersion,
            BpFutureVersions:       this.values.settings.bpFutureVersions,
            SignInDays:             this.values.settings.signIn ?? this.values.dates.valueFrom.date(),
            MonthlyCardDays:        this.values.settings.monthlyDays ?? 0,
            MonthlyCardDaysBonus:   this.values.settings.monthlyDaysBonus ?? 0,
            CompletedAbyssMissions: this.values.checkmarks?.completedAbyssMissions ?? false,
            CustomRewards:          custom ?? []
        })

        var options = {
            method: 'POST',
            headers: headers,
            body: raw
        }

        console.log(options.body)

        fetch("https://api.honkaihub.com/calc", options)
            .then(res => res.json())
            .then(res => this.setState(res))
            .catch(err => console.log(err));
    }

    render() {
        return <Fragment>
            <Grid paddingLeft={4} paddingRight={2} container className="content">
                <Grid item xs={12} md={3.7} className="input-grid">
                    <Grid container columnSpacing={2.5}>
                        <Grid item xs={12}><DateInputs updateDates={this.updateDates} /></Grid>
                        <Grid item xs={6}><Settings updateSettings={this.updateSettings} /></Grid>
                        <Grid item xs={6}><Balance updateCheckmarks={this.updateCheckmarks} updateBalance={this.updateBalance} /></Grid>
                        <Grid item xs={12} mt={2}><CustomRewards updateCustomRewards={this.updateCustomRewards}/></Grid>
                    </Grid>
                </Grid>
                <Grid item md={0.5} display="flex" justifyContent="center">
                    <Divider orientation="vertical" sx={{ backgroundColor: "#FFFFFF", borderRightWidth: '2px' }} />
                </Grid>
                <Grid item xs={12} md={2.2} className="output-grid">
                    <Grid container direction="row">
                        <Grid xs={12} item paddingLeft={2} paddingRight={2}>
                            <RewardTotal totals={this.state.total} />
                        </Grid>
                        <Grid item xs={12} mt={2}>
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