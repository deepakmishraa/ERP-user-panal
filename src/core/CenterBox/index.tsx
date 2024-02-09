import React from "react";
import { Box } from "@mui/material";

interface centerBoxProps {
  children?: React.ReactNode;
  height?: string;
  width?: string;
  gap?: string;
}
const CenterBox = (props: centerBoxProps) => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        gap: props.gap,
        height: props.height,
      }}
      minHeight={!props.height ? "60px" : props.height}
    >
      {props.children}
    </Box>
  );
};
export default CenterBox;
