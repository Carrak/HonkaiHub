﻿import { Fragment, Component } from "react";
import { Grid } from "@mui/material";
import { StyledTextField } from "./textfields/StyledTextField";
import { bp, exalted, realm, manifold, select } from "../../consts/Dropdowns";
import { getNum } from "../../consts/Utility";
import CustomTooltip from "../CustomTooltip";

interface ISettingsProps {
    updateSettings: (state: ISettingsState, update: boolean) => any
}

interface ISettingsState {
    level: number | null
    abyss: string
    realm: string
    signIn: number | null
    bpLevel: number | null
    bpThisVersion: string
    bpFutureVersions: string
    monthlyDays: number | null
    monthlyDaysBonus: number | null
}

class Settings extends Component<ISettingsProps, ISettingsState> {
    constructor(props: ISettingsProps) {
        super(props)

        this.state = {
            level: null,
            abyss: "",
            realm: "",
            signIn: null,
            bpLevel: null,
            bpThisVersion: "",
            bpFutureVersions: "",
            monthlyDays: null,
            monthlyDaysBonus: null
        }

        let inputs = localStorage.getItem("settings")
        if (inputs) {
            this.state = JSON.parse(inputs);
            this.props.updateSettings(this.state, false)
        }

        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.onChangeSignIn = this.onChangeSignIn.bind(this)
        this.onChangeBpLevel = this.onChangeBpLevel.bind(this)
        this.onChangeMonthlyDays = this.onChangeMonthlyDays.bind(this)
        this.onChangeMonthlyDaysBonus = this.onChangeMonthlyDaysBonus.bind(this)
        this.onChangeAbyss = this.onChangeAbyss.bind(this)
        this.onChangeRealm = this.onChangeRealm.bind(this)
        this.onChangeBpThisVersion = this.onChangeBpThisVersion.bind(this)
        this.onChangeBpFutureVersions = this.onChangeBpFutureVersions.bind(this)
    }

    update() {
        this.props.updateSettings(this.state, true)
        localStorage.setItem("settings", JSON.stringify(this.state))
    }

    onChangeLevel(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ level: getNum(prevState.level, e.target.value, 0, 88), abyss: "" }), () => this.update())
    }

    onChangeSignIn(e: React.ChangeEvent<HTMLInputElement>) { 
        this.setState(prevState => ({ signIn: getNum(prevState.signIn, e.target.value, 0, 31) }), () => this.update())
    }

    onChangeBpLevel(e: React.ChangeEvent<HTMLInputElement>) { 
        this.setState(prevState => ({ bpLevel: getNum(prevState.bpLevel, e.target.value, 0, 100) }), () => this.update())
    }

    onChangeMonthlyDays (e: React.ChangeEvent<HTMLInputElement>) { 
        this.setState(prevState => ({ monthlyDays: getNum(prevState.monthlyDays, e.target.value, 0) }), () => this.update())
    }

    onChangeMonthlyDaysBonus(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ monthlyDaysBonus: getNum(prevState.monthlyDaysBonus, e.target.value, 0, 14) }), () => this.update())
    }

    onChangeAbyss(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ abyss: e.target.value }, () => this.update())
    }
    onChangeRealm(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ realm: e.target.value }, () => this.update())
    }
    onChangeBpThisVersion(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ bpThisVersion: e.target.value }, () => this.update())
    }
    onChangeBpFutureVersions(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ bpFutureVersions: e.target.value }, () => this.update())
    }

    render() {
        const tooltip = <p>
            Fields marked with * are required. For calculations abyss is only available for level 70 or higher. <br />
            - Hints - <br />
            Sign-in days claimed - how many times you logged in this month <br />
            Monthly card (claimed to 15) - how many days you claimed for the 500 crystal bonus, e.g. if the page says "4/15", you specify this as 4
        </p>

        let abyssSelect;
        if (this.state.level) {
            if (this.state.level >= 70 && this.state.level <= 80)
                abyssSelect = select(manifold)
            else
                abyssSelect = select(exalted)
        }

        return <Fragment>
            <Grid container direction="column" rowSpacing={1.2}>
                <Grid item className="top-note">
                    Settings&nbsp;
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
                <Grid item>
                    <StyledTextField
                        required
                        id="level-input"
                        label="Your level"
                        value={this.state.level ?? ""}
                        onChange={this.onChangeLevel}
                    />
                </Grid>
                <Grid item>
                    <StyledTextField
                        required
                        select
                        id="abyss-input"
                        disabled={!this.state.level || this.state.level < 70}
                        label="Abyss tier"
                        value={this.state.abyss}
                        onChange={this.onChangeAbyss}
                    >
                        {abyssSelect}
                    </StyledTextField>
                </Grid>
                <Grid item>
                    <StyledTextField
                        required
                        select
                        id="realm-input"
                        label="Elysian Realm"
                        value={this.state.realm}
                        onChange={this.onChangeRealm}>
                        {select(realm)}
                    </StyledTextField>
                </Grid>
                <Grid item>
                    <StyledTextField
                        select
                        required
                        id="bp-this-version-input"
                        label="BP this version"
                        value={this.state.bpThisVersion}
                        onChange={this.onChangeBpThisVersion}
                    >
                        {select(bp)}
                    </StyledTextField>
                </Grid>
                <Grid item>
                    <StyledTextField
                        select
                        required
                        id="bp-future-versions-input"
                        label="BP future versions"
                        value={this.state.bpFutureVersions}
                        onChange={this.onChangeBpFutureVersions}
                    >
                        {select(bp)}
                    </StyledTextField>
                </Grid>
                <Grid item>
                    <StyledTextField
                        required
                        id="sign-in-input"
                        label="Sign-in days claimed"
                        value={this.state.signIn ?? ""}
                        onChange={this.onChangeSignIn}
                    />
                </Grid>
                <Grid item>
                    <StyledTextField
                        required
                        id="bp-level-input"
                        label="BP level"
                        value={this.state.bpLevel ?? ""}
                        onChange={this.onChangeBpLevel}
                    />
                </Grid>
                <Grid item>
                    <StyledTextField
                        id="monthly-days-input"
                        label="Monthly card days"
                        value={this.state.monthlyDays ?? ""}
                        onChange={this.onChangeMonthlyDays}
                    />
                </Grid>
                <Grid item>
                    <StyledTextField
                        id="monthly-15-input"
                        label="Monthly card (claimed to 15)"
                        value={this.state.monthlyDaysBonus ?? ""}
                        onChange={this.onChangeMonthlyDaysBonus}
                    />
                </Grid>
            </Grid>
        </Fragment>
    }

}

export type { ISettingsState }
export default Settings