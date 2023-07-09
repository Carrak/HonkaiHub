import { Grid } from "@mui/material";
import { Component } from "react";

const changedColor: string = "#7ee588"

interface HighlightedCurrency {
    img: string
    alt: string
    value: number
    highlighted: boolean
    canHide: boolean
}

interface ICurrenciesDisplayProps {
    currencies: HighlightedCurrency[]
}

class CurrenciesDisplay extends Component<ICurrenciesDisplayProps> { 

    constructor(props: ICurrenciesDisplayProps) {
        super(props)
    }

    render() {
        return <Grid container className="flex-center" direction="row" columnGap={1.5} rowGap={1.5}>
            {this.props.currencies.filter(x => !(x.canHide && x.value == 0)).map(x => 
                <Grid item xs="auto" className="flex reward-total-text">
                    <img src={x.img} className="currency-icon" alt={x.alt} />
                    {x.highlighted ? <b style={{ color: changedColor }} >{x.value}</b> : <span>{x.value}</span>}
                </Grid>
            )}
            </Grid>    
    }
}

export { CurrenciesDisplay }
export type { HighlightedCurrency }