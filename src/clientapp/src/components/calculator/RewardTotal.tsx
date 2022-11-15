import { Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { Component, Fragment } from "react";
import { ICalculatorTotal } from "../Calculator";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CustomTooltip from "../CustomTooltip";

interface IRewardTotalProps {
    totals: ICalculatorTotal
}

class RewardTotal extends Component<IRewardTotalProps> {
    constructor(props: IRewardTotalProps) {
        super(props)
    }

    render() {
        const tooltip = "Reward total is calculated when all the required fields are filled. " +
            "Card calculations also include the card you can buy from the BP shop, your balance and custom rewards"

        return <Fragment>
            <Grid className="reward-total-text" container direction="column" rowSpacing={1}>
                <Grid item className="top-note">
                    Reward total&nbsp;
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                <Grid item display="flex" justifyContent="center" alignItems="center">
                    <img src="Crystals.webp" className="currency-icon" />{this.props.totals.grandTotal}
                </Grid>
                <Grid item>
                    <Grid container direction="row" justifyContent="center">
                        <Stack display="flex" flexDirection="column" spacing={1}> 
                            <div className="flex">
                                or &nbsp;
                                <img src="Focused.webp" className="currency-icon" />{this.props.totals.focused} &nbsp;
                                <img src="Crystals.webp" className="currency-icon" />{this.props.totals.focusedRemainder}
                            </div>
                            <div className="flex">
                                or &nbsp;
                                <img src="Expansion.webp" className="currency-icon" />{this.props.totals.expansion} &nbsp;
                                <img src="Crystals.webp" className="currency-icon" />{this.props.totals.expansionRemainder}
                            </div>
                            <div className="flex">
                                or &nbsp;
                                <img src="ELF.webp" className="currency-icon" />{this.props.totals.elf} &nbsp;
                                <img src="Crystals.webp" className="currency-icon" />{this.props.totals.elfRemainder}
                            </div>
                            <div className="flex">
                                <Grid item className="reward-total-row">
                                    or &nbsp;
                                    <img src="SP.webp" className="currency-icon" />{this.props.totals.sp} &nbsp;
                                    <img src="Crystals.webp" className="currency-icon" />{this.props.totals.spRemainder}
                                </Grid>
                            </div>
                            <div className="flex">
                                or &nbsp;
                                <img src="Dorm.webp" className="currency-icon" />{this.props.totals.dorm} &nbsp;
                                <img src="Crystals.webp" className="currency-icon" />{this.props.totals.dormRemainder}
                            </div>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export default RewardTotal