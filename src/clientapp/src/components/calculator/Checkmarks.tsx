import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { Component, Fragment, SyntheticEvent } from 'react'

interface ICheckmarksProps {
    updateCheckmarks: (state: ICheckmarksState, update: boolean) => any
}

interface ICheckmarksState {
    completedAbyssMissions: boolean
}

class Checkmarks extends Component<ICheckmarksProps, ICheckmarksState> {
    constructor(props: ICheckmarksProps) {
        super(props)

        this.state = {
            completedAbyssMissions: false,
        }

        let inputs = localStorage.getItem("checkmarks")
        if (inputs) {
            this.state = JSON.parse(inputs);
            this.props.updateCheckmarks(this.state, false)
        }

        this.onChangeCompletedAbyssMissions = this.onChangeCompletedAbyssMissions.bind(this)
    }

    update() {
        this.props.updateCheckmarks(this.state, true)
        localStorage.setItem("checkmarks", JSON.stringify(this.state))
    }

    onChangeCompletedAbyssMissions(e: SyntheticEvent<Element, Event>, checked: boolean) {
        this.setState(({ completedAbyssMissions: checked }), () => this.update())
    }

    render() {
        return <Fragment>
            <Grid container direction="column" rowSpacing={1}>
                <Grid item>
                    <FormGroup sx={{ color: "white" }} >
                        <FormControlLabel onChange={this.onChangeCompletedAbyssMissions} value={this.state.completedAbyssMissions} control={<Checkbox />} label="Completed abyss stages" />
                    </FormGroup>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { ICheckmarksState }
export default Checkmarks
