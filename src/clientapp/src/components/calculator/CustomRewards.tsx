import { Button, Grid, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material'
import { Component, Fragment } from "react";
import { currencies, select } from "../../consts/Dropdowns";
import { StyledTextField } from "./textfields/StyledTextField";
import { getNum } from "../../consts/Utility";
import CustomTooltip from "../CustomTooltip";

interface ICustomRewardsProps {
    updateCustomRewards: (state: ICustomRewardsState, update: boolean) => any
}

interface ICustomReward {
    id: number;
    name: string
    amount: number | null;
    currency: string | null;
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
            this.props.updateCustomRewards(this.state, false)
        }

        this.getAndIncreaseId = this.getAndIncreaseId.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this)
        this.onChangeCurrency = this.onChangeCurrency.bind(this)
    }


    update() {
        this.props.updateCustomRewards(this.state, true)
        localStorage.setItem("customRewards", JSON.stringify(this.state))
    }

    getAndIncreaseId(): number {
        this.setState({ currentId: this.state.currentId + 1 });
        return this.state.currentId;
    }

    onAddClick() {
        const newReward: ICustomReward = { id: this.getAndIncreaseId(), name: "", amount: null, currency: null }
        this.setState({ rewards: [...this.state.rewards, newReward] }, () => this.update())
    }

    onRemove(id: number) {
        this.setState(prevState => ({ rewards: prevState.rewards.filter(item => item.id !== id) }), () => this.update())
    }

    onChangeAmount(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) {
        const newRewards: ICustomReward[] = this.state.rewards.map((rwrd) =>
        {
            if (rwrd.id === id)
                rwrd.amount = getNum(rwrd.amount, e.target.value, 0);
            return rwrd;
        })
        this.setState({ rewards: newRewards }, () => this.update());
    }

    onChangeCurrency(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) {
        const newRewards: ICustomReward[] = this.state.rewards.map((rwrd) => {
            if (rwrd.id === id)
                rwrd.currency = e.target.value
            return rwrd;
        })
        this.setState({ rewards: newRewards }, () => this.update());
    }

    onChangeName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) {
        const newRewards: ICustomReward[] = this.state.rewards.map((rwrd) => {
            if (rwrd.id === id)
                rwrd.name = e.target.value
            return rwrd;
        })
        this.setState({ rewards: newRewards }, () => this.update());
    }

    render() { 
        const tooltip = "Use this section to include any upcoming event rewards or rewards that you will claim in the future. "
            + "The section itself is optional, but if you want the reward to be included, fields marked with * must be filled"

        return <Fragment>
            <Grid container direction="column" rowSpacing={1}>
                <Grid item className="top-note">
                    Custom rewards&nbsp;
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                {this.state.rewards?.map((x) => (<Grid item key={"rewards" + x.id}>
                    <Grid container direction="row" columnSpacing={0.5} paddingRight={2}>
                        <Grid item xs={3.3}>
                            <StyledTextField
                                label="Name"
                                value={x.name}
                                onChange={(e) => this.onChangeName(e, x.id)}
                                id={"namecr" + x.id} />
                        </Grid>
                        <Grid item xs={3.3}>
                            <StyledTextField
                                label="Amount"
                                required
                                value={x.amount ?? ""}
                                onChange={(e) => this.onChangeAmount(e, x.id)}
                                id={"acr" + x.id} />
                        </Grid>
                        <Grid item xs={4.3}>
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
                        <Grid item xs={1.1} display="flex" justifyContent="flex-end">
                            <IconButton edge="end" size="small" onClick={() => this.onRemove(x.id)}>
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