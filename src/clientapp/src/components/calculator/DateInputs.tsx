import { Grid } from "@mui/material";
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
}

class DateInputs extends Component<IDateInputsProps, IDateInputsState> {
    constructor(props: IDateInputsProps) {
        super(props);

        this.state = {
            valueFrom: dayjs().startOf("day"),
            valueTo: null,
        }

        let inputs = localStorage.getItem("dates")
        if (inputs) {
            let stateJson = JSON.parse(inputs)
            this.state = {
                valueFrom: dayjs(stateJson.valueFrom).utc().startOf('day'),
                valueTo: dayjs(stateJson.valueTo).utc().startOf('day'),
            }
            this.props.updateDates(this.state, false)
        }
    }

    update() {
        this.props.updateDates(this.state, true)
        localStorage.setItem("dates", JSON.stringify(this.state))
    }

    render() {
        const tooltip = "Fields marked with * are required. Input the period for your calculations."

        let days: number | null = null
        if (this.state.valueTo && this.state.valueFrom)
            days = this.state.valueTo.diff(this.state.valueFrom, "day");

        return <Fragment>
            <Grid container direction="row" columnSpacing={0.7}>
                <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.valueFrom}
                            label="Date from"
                            onChange={newValue => {
                                this.setState({ valueFrom: newValue?.utc().startOf('day') ?? null }, () => this.update())
                            }}
                            renderInput={(params) => <StyledTextField required helperText={(days ?? "?") + " days"} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputFormat="DD.MM.YYYY"
                            value={this.state.valueTo}
                            onChange={(newValue) => {
                                this.setState({ valueTo: newValue?.utc().startOf('day') ?? null }, () => this.update())
                            }}
                            label="Date to"
                            renderInput={(params) => <StyledTextField required {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={1} display="flex" justifyContent="flex-end">
                    <CustomTooltip tooltip={tooltip} />
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { IDateInputsState }
export default DateInputs;