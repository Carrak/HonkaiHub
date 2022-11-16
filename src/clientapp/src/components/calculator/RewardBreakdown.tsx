import { Grid } from '@mui/material'
import { Component, Fragment } from 'react'
import { ICalculatorBreakdown } from '../Calculator'
import { StyledReadonlyTextField } from './textfields/StyledTextField'
import CustomTooltip from '../CustomTooltip';

interface IRewardBreakdownProps {
    breakdown: ICalculatorBreakdown
}

class RewardBreakdown extends Component<IRewardBreakdownProps> {

    render() {
        const tooltip = "This section only includes crystal rewards, but cards are still included in Reward Total"

        return <Fragment>
            <Grid container direction="row" rowSpacing={1.2} columnSpacing={1}>
                <Grid item xs={12} className="top-note">
                    Reward breakdown&nbsp;
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="abyss" label="Abyss" value={this.props.breakdown.abyss} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="realm" label="Elysian realm" value={this.props.breakdown.elysianRealm} />
                </Grid>
                <Grid item xs={6}> 
                    <StyledReadonlyTextField id="dailies" label="Dailies" value={this.props.breakdown.dailies} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="sign-in" label="Sign-in" value={this.props.breakdown.signIn} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="monthly-card" label="Monthly card" value={this.props.breakdown.monthlyCard} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="bp" label="Battlepass" value={this.props.breakdown.bp} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="maintenance" label="Maintenance" value={this.props.breakdown.maintenance} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="extras" label="Streams/codes" value={this.props.breakdown.extras} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="arena" label="Arena" value={this.props.breakdown.arena} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="armada" label="Armada" value={this.props.breakdown.armada} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="birthdays" label="Birthdays" value={this.props.breakdown.birthdays} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="weekly-share" label="Weekly share" value={this.props.breakdown.weeklyShare} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="abyss" label="Current" value={this.props.breakdown.current} />
                </Grid>
                <Grid item xs={6}>
                    <StyledReadonlyTextField id="abyss" label="Custom rewards" value={this.props.breakdown.custom} />
                </Grid>
            </Grid>
        </Fragment>
    }
}

export default RewardBreakdown;