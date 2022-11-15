import { Grid, IconButton, Link, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Component, Fragment } from "react";
import { StyledTextField } from "./textfields/StyledTextField";
import CustomTooltip from "../CustomTooltip";

interface IDateInputsProps {
    updateDates: (state: IDateInputsState, update: boolean) => any
}

interface IDateInputsState {
    valueFrom: Dayjs | null;
    valueTo: Dayjs | null;
    versionFrom: Dayjs | null;
}

class DateInputs extends Component<IDateInputsProps, IDateInputsState> {
    constructor(props: IDateInputsProps) {
        super(props);

        this.state = {
            valueFrom: dayjs().startOf("day"),
            valueTo: null,
            versionFrom: null
        }

        let inputs = localStorage.getItem("dates")
        if (inputs) {
            let stateJson = JSON.parse(inputs)
            this.state = {
                valueFrom: dayjs(stateJson.valueFrom),
                valueTo: dayjs(stateJson.valueTo),
                versionFrom: dayjs(stateJson.versionFrom)
            }
            this.props.updateDates(this.state, false)
        }
    }

    update() {
        this.props.updateDates(this.state, true)
        localStorage.setItem("dates", JSON.stringify(this.state))
    }

    render() {
        const tooltip = "Fields marked with * are required. Input the period for your calculations and when the current version started. " +
            "Visit Honkai Update Log to find when the current version started"

        let days: number | null = null
        if (this.state.valueTo && this.state.valueFrom)
            days = this.state.valueTo.diff(this.state.valueFrom, "day");

        return <Fragment>
            <Grid container direction="row" rowSpacing={1} columnSpacing={1} paddingRight={2}>
                <Grid item xs={3.8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.valueFrom}
                            label="Date from"
                            onChange={newValue => {
                                this.setState(prevState => ({ ...prevState, valueFrom: newValue }), () => this.update())
                            }}
                            renderInput={(params) => <StyledTextField required helperText={(days ?? "?") + " days"} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={3.8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.valueTo}
                            onChange={(newValue) => {
                                this.setState({ valueTo: newValue }, () => this.update())
                            }}
                            label="Date to"
                            renderInput={(params) => <StyledTextField required {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={3.8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.versionFrom}
                            onChange={(newValue) => {
                                this.setState({ versionFrom: newValue }, () => this.update())
                            }}
                            label="Version since"
                            renderInput={(params) => <StyledTextField required helperText={<a target="_blank" href="https://honkaiimpact3.fandom.com/wiki/Update_Log">UPDATE LOG</a>} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={0.6}>
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { IDateInputsState }
export default DateInputs;