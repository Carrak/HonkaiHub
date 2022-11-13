import { Box, Grid, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Component, Fragment } from "react";
import { getNum } from "../../consts/Utility";
import Checkmarks, { ICheckmarksState } from "./Checkmarks";
import { StyledTextField } from "./textfields/StyledTextField";

interface IBalanceProps {
    updateBalance: (state: IBalanceState, update: boolean) => any
    updateCheckmarks: (state: ICheckmarksState, update: boolean) => any
}

interface IBalanceState {
    crystals: number | null
    expansion: number | null
    focused: number | null
    elf: number | null
    sp: number | null
    dorm: number | null
}


class Balance extends Component<IBalanceProps, IBalanceState> {
    constructor(props: IBalanceProps) {
        super(props)

        this.state = {
            crystals: null,
            expansion: null,
            focused: null,
            elf: null,
            sp: null,
            dorm: null
        }

        let inputs = localStorage.getItem("balance")
        if (inputs) {
            this.state = JSON.parse(inputs);

            this.props.updateBalance(this.state, false)
        }
        this.onChangeCrystals = this.onChangeCrystals.bind(this)
        this.onChangeExpansion = this.onChangeExpansion.bind(this)
        this.onChangeFocused = this.onChangeFocused.bind(this)
        this.onChangeElf = this.onChangeElf.bind(this)
        this.onChangeSP = this.onChangeSP.bind(this)
        this.onChangeDorm = this.onChangeDorm.bind(this)
    }

    update() {
        this.props.updateBalance(this.state, true)
        localStorage.setItem("balance", JSON.stringify(this.state))
    }

    onChangeCrystals(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState((prevState) => ({ crystals: getNum(prevState.crystals, e.target.value, 0) }), () => this.update())
    }

    onChangeExpansion(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ expansion: getNum(prevState.expansion, e.target.value, 0) }), () => this.update())
    }

    onChangeFocused(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ focused: getNum(prevState.focused, e.target.value, 0) }), () => this.update())
    }

    onChangeElf(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ elf: getNum(prevState.elf, e.target.value, 0) }), () => this.update())
    }

    onChangeSP(e: React.ChangeEvent<HTMLInputElement>) { 
        this.setState(prevState => ({ sp: getNum(prevState.sp, e.target.value, 0) }), () => this.update())
    }

    onChangeDorm(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ dorm: getNum(prevState.dorm, e.target.value, 0) }), () =>this.update())
    }

    render() {
        const tooltip = "Use these fields to include your current crystal balance or cards you already have"

        return <Fragment>
            <Grid container direction="column" rowSpacing={1.2}>
                <Grid item className="top-note">
                    Balance&nbsp;
                    <Tooltip title={tooltip}>
                        <HelpOutlineIcon className="tooltip-icon"/>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Box className="balance-box">
                        <img src="Crystals.webp" className="currency-icon" />
                        <StyledTextField id="crystals" label="Crystals"
                            value={this.state.crystals ?? ""}
                            onChange={this.onChangeCrystals} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="balance-box">
                        <img src="Expansion.webp" className="currency-icon" />
                        <StyledTextField id="expansion" label="Expansion cards"
                            value={this.state.expansion ?? ""} onChange={this.onChangeExpansion} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="balance-box">
                        <img src="Focused.webp" className="currency-icon" />
                        <StyledTextField id="focused" label="Focused cards"
                            value={this.state.focused ?? ""} onChange={this.onChangeFocused} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="balance-box">
                        <img src="ELF.webp" className="currency-icon" />
                        <StyledTextField id="elf" label="Elf cards"
                            value={this.state.elf ?? ""} onChange={this.onChangeElf} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="balance-box">
                        <img src="SP.webp" className="currency-icon" />
                        <StyledTextField id="sp" label="SP cards"
                            value={this.state.sp ?? ""} onChange={this.onChangeSP} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="balance-box">
                        <img src="Dorm.webp" className="currency-icon" />
                        <StyledTextField id="dorm" label="Dorm cards"
                            value={this.state.dorm ?? ""} onChange={this.onChangeDorm} />
                    </Box>
                </Grid>
                <Grid item mt={1}>
                    <Checkmarks updateCheckmarks={this.props.updateCheckmarks}/>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { IBalanceState }
export default Balance;