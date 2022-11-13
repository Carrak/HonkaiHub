import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { Component, Fragment, SyntheticEvent } from 'react'

interface ICheckmarksProps {
    updateCheckmarks: (state: ICheckmarksState, update: boolean) => any
}

interface ICheckmarksState {
    filledSurvey: boolean,
    usedCodes: boolean,
}

class Checkmarks extends Component<ICheckmarksProps, ICheckmarksState> {
    constructor(props: ICheckmarksProps) {
        super(props)

        this.state = {
            filledSurvey: false,
            usedCodes: false,
        }

        let inputs = localStorage.getItem("checkmarks")
        if (inputs) {
            this.state = JSON.parse(inputs);
            this.props.updateCheckmarks(this.state, false)
        }

        this.onChangeFilledSurvey = this.onChangeFilledSurvey.bind(this)
        this.onChangeUsedCodes = this.onChangeUsedCodes.bind(this)
    }

    update() {
        this.props.updateCheckmarks(this.state, true)
        localStorage.setItem("checkmarks", JSON.stringify(this.state))
    }

    onChangeFilledSurvey(e: SyntheticEvent<Element, Event>, checked: boolean) {
        this.setState(({ filledSurvey: checked }), () => this.update())
    }

    onChangeUsedCodes(e: SyntheticEvent<Element, Event>, checked: boolean) {
        this.setState(({ usedCodes: checked }), () => this.update())
    }

    render() {
        return <Fragment>
            <Grid container direction="column" rowSpacing={1}>
                <Grid item>
                    <FormGroup sx={{ color: "white" }} >
                        <FormControlLabel onChange={this.onChangeFilledSurvey} value={this.state.filledSurvey} control={<Checkbox />} label="Filled the survey" />
                        <FormControlLabel onChange={this.onChangeUsedCodes} value={this.state.usedCodes} control={<Checkbox />} label="Used stream codes" />
                    </FormGroup>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { ICheckmarksState }
export default Checkmarks
