import { styled, TextField, TextFieldProps } from "@mui/material";

//sx={{ maxWidth: "25ch" }}

export const StyledTextField = styled((props: TextFieldProps) => (
    <TextField
        fullWidth variant="outlined" size="small" {...props}
    />
))(() => ({}));

export const StyledReadonlyTextField = styled((props: TextFieldProps) => (
    <TextField
        fullWidth InputProps={{readOnly: true}} variant="outlined" size="small" {...props}
    />
))(() => ({}));

