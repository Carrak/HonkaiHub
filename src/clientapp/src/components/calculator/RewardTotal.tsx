import { Grid, Stack } from "@mui/material";
import { Component, Fragment } from "react";
import { ICalculatorTotal } from "../Calculator";
import { conversionCurrencies, select } from "../../consts/Dropdowns";
import CustomTooltip from "../CustomTooltip";
import { StyledTextField } from "./textfields/StyledTextField";

const rewardTotalTooltip = "Reward total is your balance plus everything you earn across the specified period. " +
    "It is calculated when all the required fields are filled. " +
    "Card calculations also include the focused card you can buy from the BP shop."

const currencyConverterTooltip = "Choose a currency to convert your crystals to. The converted amount is added to the existing amount, " +
    "e. g. 1000 crystals and 10 focused cards would convert to 13 cards and 160 crystals. " +
    "The rest of the rewards remain unchanged."

interface IRewardTotalProps {
    totals: ICalculatorTotal
}

interface IRewardTotalState {
    conversionCurrency: number
}

const currencyPrices: number[] = [
    1,   // crystals
    280, // focused
    280, // expansion
    150, // elf
    120, // sp
    200  // dorm
]

const changedColor: string = "#7ee588"

class RewardTotal extends Component<IRewardTotalProps, IRewardTotalState> {

    constructor(props: IRewardTotalProps) {
        super(props)

        this.state = {
            conversionCurrency: 1
        }

        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    onChangeCurrency(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState(() => ({ conversionCurrency: +e.target.value }))
    }

    render() {
        
        let currencyValues: number[] = [
            this.props.totals.grandTotal,
            this.props.totals.focused,
            this.props.totals.expansion,
            this.props.totals.elf,
            this.props.totals.sp,
            this.props.totals.dorm
        ]

        let elements: JSX.Element[] = currencyValues.map(x => <span>{x}</span>);

        let cc = this.state.conversionCurrency;
        let oldValue = currencyValues[cc];

        currencyValues[0] = this.props.totals.grandTotal % currencyPrices[cc];
        currencyValues[cc] += + Math.floor(this.props.totals.grandTotal / currencyPrices[cc]);

        if (oldValue != currencyValues[cc]) {
            elements[0] = <b style={{ color: changedColor }} >{currencyValues[0]}</b>
            elements[cc] = <b style={{ color: changedColor }}>{currencyValues[cc]}</b>
        }

        return <Fragment>
            <Grid className="reward-total-text" container direction="column" rowSpacing={0.6}>
                <Grid item className="top-note">
                    Total&nbsp;
                    <CustomTooltip tooltip={rewardTotalTooltip} />
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                    <img src="Crystals.webp" className="currency-icon" alt="crystals" />{this.props.totals.grandTotal}&nbsp;&nbsp;
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                    <img src="Focused.webp" className="currency-icon" alt="focused cards" />{this.props.totals.focused}&nbsp;&nbsp;
                    <img src="Expansion.webp" className="currency-icon" alt="expansion cards" />{this.props.totals.expansion}
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                    <img src="ELF.webp" className="currency-icon" alt="ELF cards" />{this.props.totals.elf}&nbsp;&nbsp;
                    <img src="SP.webp" className="currency-icon" alt="SP cards" />{this.props.totals.sp}&nbsp;&nbsp;
                    <img src="Dorm.webp" className="currency-icon" alt="dorm cards" />{this.props.totals.dorm}
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                </Grid>
                <Grid item mt={1} mb={1}>
                    <Grid container direction="row" justifyContent="center">
                        <Stack display="flex" flexDirection="column" spacing={0.6}> 
                            <div className="top-note">
                                Convert crystals to&nbsp;
                                <CustomTooltip tooltip={currencyConverterTooltip} />
                            </div>
                            <StyledTextField
                                label=""
                                value={this.state.conversionCurrency ?? ""}
                                onChange={(e) => this.onChangeCurrency(e)}
                                select
                                id={"currency_converter"}>
                                {select(conversionCurrencies)}
                            </StyledTextField>
                            <Grid className="reward-total-text" container direction="column" rowSpacing={0.6}>
                                <Grid item display="flex" justifyContent="center" alignItems="center">
                                    <img src="Crystals.webp" className="currency-icon" alt="crystals" />{elements[0]}
                                </Grid>
                                <Grid item display="flex" justifyContent="center" alignItems="center">
                                    <img src="Focused.webp" className="currency-icon" alt="focused cards" />{elements[1]}&nbsp;&nbsp;
                                    <img src="Expansion.webp" className="currency-icon" alt="expansion cards" />{elements[2]}
                                </Grid>
                                <Grid item display="flex" justifyContent="center" alignItems="center">
                                    <img src="ELF.webp" className="currency-icon" alt="ELF cards" />{elements[3]}&nbsp;&nbsp;
                                    <img src="SP.webp" className="currency-icon" alt="SP cards" />{elements[4]}&nbsp;&nbsp;
                                    <img src="Dorm.webp" className="currency-icon" alt="dorm cards" />{elements[5]}
                                </Grid>
                            </Grid> 
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export default RewardTotal