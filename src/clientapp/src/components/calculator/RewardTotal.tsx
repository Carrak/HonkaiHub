import { Grid, Stack } from "@mui/material";
import { Component, Fragment } from "react";
import { ICalculatorTotal } from "../Calculator";
import { conversionCurrencies, select } from "../../consts/Dropdowns";
import CustomTooltip from "../CustomTooltip";
import { StyledTextField } from "./textfields/StyledTextField";
import { CurrenciesDisplay } from "./CurrenciesDisplay";

const tooltip = <span>
    Total includes:<br />
    - balance<br />
    - custom rewards<br />
    - earnings across specified period (including focused card from BP)<br />
    It is calculated when all the required fields are filled. <br/><br/>
    "Convert to" options converts crystals to a given currency,
    e. g. 1000 crystals and 10 focused cards would convert to 13 cards and 160 crystals.
    </span>

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

class RewardTotal extends Component<IRewardTotalProps, IRewardTotalState> {

    constructor(props: IRewardTotalProps) {
        super(props)

        this.state = {
            conversionCurrency: -1
        }

        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    onChangeCurrency(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState(() => ({ conversionCurrency: +e.target.value }))
    }

    render() {
        
        let values: number[] = [
            this.props.totals.grandTotal,
            this.props.totals.focused,
            this.props.totals.expansion,
            this.props.totals.elf,
            this.props.totals.sp,
            this.props.totals.dorm
        ]

        let highlights: boolean[] = new Array<boolean>(values.length);

        if (this.state.conversionCurrency != -1) {

            let cc = this.state.conversionCurrency;
            let oldValue = values[cc];

            values[0] = this.props.totals.grandTotal % currencyPrices[cc];
            values[cc] += + Math.floor(this.props.totals.grandTotal / currencyPrices[cc]);

            if (oldValue != values[cc]) {
                highlights[0] = true;
                highlights[cc] = true;
            }
        }

        return <Fragment>
            <Grid container className="reward-total-text" display="flex" alignItems="center" justifyContent="center" direction="row" rowGap={1}>
                <Grid item xs={12} className="top-note">
                    Total
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                <Grid item xs="auto">
                    <StyledTextField
                        label="Convert to"
                        value={this.state.conversionCurrency ?? ""}
                        onChange={(e) => this.onChangeCurrency(e)}
                        select
                        id={"currency_converter"}>
                        {select(conversionCurrencies)}
                    </StyledTextField>
                </Grid>
                <Grid item xs={10} display="flex" alignItems="center" mt={2}>
                    <CurrenciesDisplay
                        currencies={[
                            { img: "Crystals.webp", alt: "crystals", value: values[0], highlighted: highlights[0], canHide: false },
                            { img: "Focused.webp", alt: "focused", value: values[1], highlighted: highlights[1], canHide: true },
                            { img: "Expansion.webp", alt: "expansion", value: values[2], highlighted: highlights[2], canHide: true },
                            { img: "ELF.webp", alt: "elf", value: values[3], highlighted: highlights[3], canHide: true },
                            { img: "SP.webp", alt: "sp", value: values[4], highlighted: highlights[4], canHide: true },
                            { img: "Dorm.webp", alt: "dorm", value: values[5], highlighted: highlights[5], canHide: true }
                        ]}
                    />
                </Grid>
            </Grid>
        </Fragment>
    }
}

export default RewardTotal