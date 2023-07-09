import { Grid } from '@mui/material'
import { Component, Fragment } from 'react'
import { ICalculatorBreakdown } from '../Calculator'
import { StyledTextField } from './textfields/StyledTextField'
import CustomTooltip from '../CustomTooltip';

const tooltip = "This section only includes crystal rewards, but cards are still included in Reward Total"

interface IRewardBreakdownProps {
    breakdown: ICalculatorBreakdown
}

class RewardBreakdown extends Component<IRewardBreakdownProps> {

    render() {
        return <Fragment>
            <Grid container direction="row" rowSpacing={1.2} columnSpacing={1}>
                <Grid item xs={12} className="top-note">
                    Crystal breakdown
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="abyss" label="Abyss" value={this.props.breakdown.abyss} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="realm" label="Elysian realm" value={this.props.breakdown.elysianRealm} />
                </Grid>
                <Grid item xs={6}> 
                    <StyledTextField id="dailies" label="Dailies" value={this.props.breakdown.dailies} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="sign-in" label="Sign-in" value={this.props.breakdown.signIn} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="monthly-card" label="Monthly card" value={this.props.breakdown.monthlyCard} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="bp" label="Battlepass" value={this.props.breakdown.bp} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="maintenance" label="Maintenance" value={this.props.breakdown.maintenance} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="extras" label="Streams/codes" value={this.props.breakdown.streamsSurveys} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="arena" label="Arena" value={this.props.breakdown.arena} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="armada" label="Armada" value={this.props.breakdown.armada} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="birthdays" label="Birthdays" value={this.props.breakdown.birthdays} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="weekly-share" label="Weekly share" value={this.props.breakdown.weeklyShare} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="abyss" label="Current" value={this.props.breakdown.current} />
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField id="abyss" label="Custom rewards" value={this.props.breakdown.custom} />
                </Grid>
            </Grid>
        </Fragment>
    }
}

export default RewardBreakdown;