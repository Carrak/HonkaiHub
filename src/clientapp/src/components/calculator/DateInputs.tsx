import { Grid } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Component, Fragment } from "react";
import { StyledTextField } from "./textfields/StyledTextField";
import CustomTooltip from "../CustomTooltip";
import { Moment } from "moment";
import moment from "moment";

interface IDateInputsProps {
    updateDates: (state: IDateInputsState, update: boolean) => any
}

interface IDateInputsState {
    valueFrom: Moment | null;
    valueTo: Moment | null;
}

class DateInputs extends Component<IDateInputsProps, IDateInputsState> {
    constructor(props: IDateInputsProps) {
        super(props);

        this.state = {
            valueFrom: moment(),
            valueTo: null,
        }

        let inputs = localStorage.getItem("dates")
        if (inputs) {
            let stateJson = JSON.parse(inputs)
            this.state = {
                valueFrom: moment(stateJson.valueFrom),
                valueTo: moment(stateJson.valueTo),
            }
            this.props.updateDates(this.state, false)
        }
    }

    update() {
        this.props.updateDates(this.state, true)
        localStorage.setItem("dates", JSON.stringify(this.state))
    }

    updateFrom(newValue: Moment | null) {
        this.setState(prevState => ({
            valueFrom: newValue,
            valueTo: newValue?.isAfter(prevState.valueTo) ? null : prevState.valueTo
        }), () => this.update())
    }

    updateTo(newValue: Moment | null) {
        this.setState(prevState => ({
            valueTo: newValue,
            valueFrom: newValue?.isBefore(prevState.valueFrom) ? null : prevState.valueFrom
        }), () => this.update())
    }

    render() {
        const tooltip = "Fields marked with * are required. Input the period for your calculations."

        let days: number | null = null
        if (this.state.valueTo && this.state.valueFrom)
            days = this.state.valueTo.diff(this.state.valueFrom, "day");

        return <Fragment>
            <Grid container direction="row" columnSpacing={0.7}>
                <Grid item xs={5.3} md={5.5}>
                    <LocalizationProvider dateAdapter={AdapterMoment} >
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.valueFrom}
                            label="Date from"
                            onChange={newValue => this.updateFrom(newValue)}
                            renderInput={(params) => <StyledTextField required helperText={(days ?? "?") + " days"} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={5.3} md={5.5}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.valueTo}
                            onChange={newValue => this.updateTo(newValue)}
                            label="Date to"
                            renderInput={(params) => <StyledTextField required {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={1.4} md={1} display="flex" justifyContent="flex-end">
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { IDateInputsState }
export default DateInputs;