import React from "react";
import { Box } from "@mui/material";
interface BetweenInterface {
  children?: React.ReactNode;
  m?: number;
  p?: number;
  px?: number;
  py?: number;
  pl?:number,
  pr?:number,
  width?: string;
}
const SpaceBetween = (props: BetweenInterface) => {
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        height:"100%"
      }}
      width={props.width}
      p={props.p}
      m={props.m}
      px={props.px}
      py={props.py}
      pl={props.pl}
      pr={props.pr}
    >
      {props.children}
    </Box>
  );
};
export default SpaceBetween;
