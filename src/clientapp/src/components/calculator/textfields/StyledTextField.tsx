import { styled, TextField, TextFieldProps } from "@mui/material";

export const StyledTextField = styled((props: TextFieldProps) => (
    <TextField
        fullWidth
        variant="outlined"
        size="small"
        {...props}
    />
))(() => ({}));

