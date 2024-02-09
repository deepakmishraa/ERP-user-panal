import React from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Password from "../Password";

interface IProps {
  value: string | number;
  togglePassword?: boolean;
  setTogglePassword?: (togglePassword: boolean) => void;
  type: "number" | "password" | "text";
  label: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  multiline?: boolean;
  disabled?: boolean;
  handleTogglePassword?: () => void;
}

const OutlineInput: React.FC<IProps> = ({
  value,
  togglePassword,
  setTogglePassword,
  type,
  label,
  handleInputChange,
  error,
  multiline,
  disabled,
  handleTogglePassword,
}) => {
  return (
    <TextField
      fullWidth
      disabled={disabled}
      name={label}
      type={type === "password" ? (togglePassword ? "text" : "password") : type}
      variant="outlined"
      value={value}
      onChange={handleInputChange}
      margin="dense"
      label={label}
      inputProps={{ style: { fontSize: 14 } }} // font size of input text
      InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
      color="warning"
      rows={multiline ? "2" : undefined}
      multiline={multiline}
      helperText={
        <Typography
          variant="h6"
          fontWeight={600}
          fontSize={"12px"}
          p={0}
          m={0}
          color="error"
        >
          {error}
        </Typography>
      }
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="togglePassword password visibility"
                    onClick={handleTogglePassword}
                  >
                    <Password value={togglePassword ? togglePassword : false} />
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default OutlineInput;
