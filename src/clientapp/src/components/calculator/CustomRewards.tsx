import { Button, Grid, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material'
import { Component, Fragment } from "react";
import { currencies, select } from "../../consts/Dropdowns";
import { StyledTextField } from "./textfields/StyledTextField";
import { getNum } from "../../consts/Utility";
import CustomTooltip from "../CustomTooltip";

interface ICustomRewardsProps {
    updateCustomRewards: (state: ICustomReward[], update: boolean) => any
}

interface ICustomReward {
    id: number;
    name: string
    amount: number | null;
    currency: number | null;
}

interface ICustomRewardsState {
    currentId: number;
    rewards: ICustomReward[];
}

class CustomRewards extends Component<ICustomRewardsProps, ICustomRewardsState> {
    constructor(props: ICustomRewardsProps) {
        super(props);

        this.state = {
            currentId: 0,
            rewards: [
                { id: -1, name: "", amount: null, currency: null }
            ]
        }

        let inputs = localStorage.getItem("customRewards")
        if (inputs) {
            this.state = JSON.parse(inputs);
            this.props.updateCustomRewards(this.state.rewards.filter(this.isRewardComplete), false)
        }

        this.getAndIncreaseId = this.getAndIncreaseId.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this)
        this.onChangeCurrency = this.onChangeCurrency.bind(this)
    }

    update(updateCalc: boolean) {
        if (updateCalc)
            this.props.updateCustomRewards(this.state.rewards.filter(this.isRewardComplete), true)
        localStorage.setItem("customRewards", JSON.stringify(this.state))
    }

    isRewardComplete = (reward: ICustomReward): boolean => reward.currency != null && reward.amount != null

    getAndIncreaseId(): number {
        this.setState({ currentId: this.state.currentId + 1 });
        return this.state.currentId;
    }

    onAddClick() {
        const newReward: ICustomReward = { id: this.getAndIncreaseId(), name: "", amount: null, currency: null }
        this.setState({ rewards: [...this.state.rewards, newReward] })
    }

    onRemove(id: number) {
        this.setState(prevState => ({ rewards: prevState.rewards.filter(item => item.id !== id) }), () => this.update(true))
    }

    onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: number,
        set: (rwrd: ICustomReward, input: string) => ICustomReward) {
        let flag = false
        const newRewards: ICustomReward[] = this.state.rewards.map((rwrd) => {
            if (rwrd.id === id) {
                const old = this.isRewardComplete(rwrd)
                rwrd = set(rwrd, e.target.value)
                const curr = this.isRewardComplete(rwrd)
                flag = old != curr || curr
            }
            return rwrd;
        })
        this.setState({ rewards: newRewards }, () => this.update(flag));
    }

    onChangeAmount(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) {
        this.onChange(e, id, (rwrd: ICustomReward, input: string) => {
            rwrd.amount = getNum(rwrd.amount, e.target.value)
            return rwrd
        })
    }

    onChangeCurrency(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) {
        this.onChange(e, id, (rwrd: ICustomReward, input: string) => {
            rwrd.currency = +input
            return rwrd
        })
    }

    onChangeName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) {
        this.onChange(e, id, (rwrd: ICustomReward, input: string) => {
            rwrd.name = input
            return rwrd
        })
    }

    render() { 
        const tooltip = "Use this section to include any upcoming event rewards or rewards that you will claim in the future. "
            + "The section itself is optional, but if you want the reward to be included, fields marked with * must be filled"

        return <Fragment>
            <Grid container direction="column" rowSpacing={1}>
                <Grid item className="top-note">
                    Custom rewards
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                {this.state.rewards?.map((x) => (<Grid item key={"rewards" + x.id}>
                    <Grid container direction="row" columnSpacing={0.5}>
                        <Grid item xs={3.2}>
                            <StyledTextField
                                label="Name"
                                value={x.name}
                                onChange={(e) => this.onChangeName(e, x.id)}
                                id={"namecr" + x.id} />
                        </Grid>
                        <Grid item xs={2.5}>
                            <StyledTextField
                                label="Amount"
                                required
                                value={x.amount ?? ""}
                                onChange={(e) => this.onChangeAmount(e, x.id)}
                                id={"acr" + x.id} />
                        </Grid>
                        <Grid item xs={true}>
                            <StyledTextField
                                label="Currency"
                                required
                                value={x.currency ?? ""}
                                onChange={(e) => this.onChangeCurrency(e, x.id)}
                                select
                                id={"scr" + x.id}>
                                {select(currencies)}
                            </StyledTextField>
                        </Grid>
                        <Grid item xs="auto">
                            <IconButton size="small" onClick={() => this.onRemove(x.id)}>
                                <Delete />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>))}
                <Grid item>
                    <Button variant="contained" onClick={this.onAddClick}>ADD</Button>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { ICustomReward, ICustomRewardsState };
export default CustomRewards;