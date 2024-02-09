import { Typography } from "@mui/material";
import React from "react";

interface subTitleProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit"
    | undefined;
  children?: React.ReactNode;
  padding?: number | string;
  color?: string;
}
const SubTitle = (props: subTitleProps) => {
  return (
    <Typography
      variant={props.variant ? props.variant : "subtitle1"}
      color={props.color}
      p={props.padding}

    >
      {props.children}
    </Typography>
  );
};

export default SubTitle;
