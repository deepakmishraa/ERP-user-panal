import React from "react";
import {
  Typography,
  InputAdornment,
  IconButton,
  InputBase,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
import LForgetPassword from "../LForget";
import { useLocation } from "react-router-dom";
import Password from "../Password";
import OutlineInput from "./OutlineInput";

interface IProps {
  togglePassword?: boolean;
  setTogglePassword?: (togglePassword: boolean) => void;
  name: string;
  value: string | number;
  disabled?: boolean;
  setValue?: (value: string | number) => void;
  type: "number" | "password" | "text" | "date";
  label: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTogglePassword?: () => void;
  error?: string;
  rows?: number;
  sLink?: boolean;
  placeholder?: string;
}

const InputField: React.FC<IProps> = ({
  togglePassword,
  name,
  value,
  disabled,
  type,
  label,
  handleInputChange,
  handleTogglePassword,
  error,
  rows,
  sLink,
  placeholder,
}) => {
  const location = useLocation();
  return (
    <FormControl size="small" fullWidth sx={{ maxWidth: "394px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 0.5,
        }}
      >
        <Typography
          variant="h5"
          color={"#111"}
          fontWeight={700}
          lineHeight={"19px"}
          gutterBottom
          fontSize={"14px"}
        >
          {label}
        </Typography>
        {sLink && location.pathname !== "/changepassword" && (
          <LForgetPassword />
        )}
      </Box>

      <TextField
        size="small"
        name={name}
        fullWidth
        disabled={disabled}
        placeholder={placeholder}
        type={
          type === "password" ? (togglePassword ? "text" : "password") : type
        }
        variant="outlined"
        value={value}
        sx={{
          "&.Mui-focused": {
            boxShadow:
              "0px 0.5px 1px 0.5px rgba(15, 17, 17, 0.15) inset, 0px 0px 0px 3px #C8F3FA",
          },

          "&.MuiInputBase-root": {
            border: "1px solid #ccc",
            borderRadius: "3px",
          },
          "& .MuiInputBase-input": {
            // borderRadius: "3px",
            // px: 1,
            // py: 0.5,
          },
        }}
        onChange={handleInputChange}
        // margin="normal"
        // label={label}
        multiline={rows ? true : false}
        rows={rows}
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        color={error ? "warning" : "primary"}
        helperText={
          <Typography
            variant="h6"
            component="span"
            fontWeight={600}
            fontSize={"10px"}
            pl={0}
            color="#ff0000"
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
                      <Password
                        value={togglePassword ? togglePassword : false}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </FormControl>
  );
};

export default InputField;
export { default as OutlineInput } from "./OutlineInput";
