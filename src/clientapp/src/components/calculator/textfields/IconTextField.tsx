import { Box, TextFieldProps} from "@mui/material";
import { Component } from "react";
import { StyledTextField } from "./StyledTextField";

interface IconTextFieldProps {
    id: string
    label: string
    src: string
    textFieldProps: TextFieldProps
}

class IconTextField extends Component<IconTextFieldProps> {

    render() {
        return <Box className="balance-box">
            <img src={this.props.src} className="currency-icon" />
            <StyledTextField id={this.props.id} label={this.props.label} {...this.props.textFieldProps} />
        </Box>
    }
}

export default IconTextField;