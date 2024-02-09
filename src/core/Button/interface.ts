import { ButtonOwnProps } from "@mui/material";
export interface IButton {
    children?: React.ReactNode;
    variant?: "text" | "outlined" | "contained" | undefined;
    loader?: boolean;
    disabled?: boolean;
    type?: "submit" | "button" | "reset" | undefined;
    textTransform?:String,
    top?:string,
    color?:ButtonOwnProps["color"]
  }