import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { Component, Fragment, SyntheticEvent } from 'react'

interface ICheckmarksProps {
    updateCheckmarks: (state: ICheckmarksState, update: boolean) => any
}

interface ICheckmarksState {
}

class Checkmarks extends Component<ICheckmarksProps, ICheckmarksState> {
    constructor(props: ICheckmarksProps) {
        super(props)

        this.state = {
        }

        let inputs = localStorage.getItem("checkmarks")
        if (inputs) {
            this.state = JSON.parse(inputs);
            this.props.updateCheckmarks(this.state, false)
        }

    }

    update() {
        this.props.updateCheckmarks(this.state, true)
        localStorage.setItem("checkmarks", JSON.stringify(this.state))
    }

    }

    render() {
        return <Fragment>
            <Grid container direction="column" rowSpacing={1}>
                <Grid item>
                    <FormGroup sx={{ color: "white" }} >
                    </FormGroup>
                </Grid>
            </Grid>
        </Fragment>
    }
}

export type { ICheckmarksState }
export default Checkmarks
