import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import { Component, ReactNode } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface ICustomTooltipProps {
    tooltip: ReactNode
}

interface ICustomTooltipState {
    open: boolean
}

class CustomTooltip extends Component<ICustomTooltipProps, ICustomTooltipState> {
    constructor(props: ICustomTooltipProps) {
        super(props)

        this.state = {
            open: false
        }
    }

    handleTooltipClose = () => this.setState({ open: false })
    handleTooltipOpen = () => this.setState(prevState => ({ open: !prevState.open }))

    render() {
        return <ClickAwayListener onClickAway={this.handleTooltipClose}>
            <div>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={this.handleTooltipClose}
                    open={this.state.open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={this.props.tooltip}
                >
                    <IconButton onClick={this.handleTooltipOpen}>
                        <HelpOutlineIcon className="tooltip-icon" />
                    </IconButton>
                </Tooltip>
            </div>
        </ClickAwayListener>
    }
}

export default CustomTooltip