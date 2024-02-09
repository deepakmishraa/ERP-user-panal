import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface ProgressProps {
  value: number; // Current value (percentage) of the progress
}

const CircularProgressBar: React.FC<ProgressProps> = ({ value }) => {
  // Determine the color based on the percentage value
  const progressColor = (value: number): "primary" | "secondary" => {
    if (value < 50) return "secondary";
    return "primary";
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        color={progressColor(value)}
        size={35}
        thickness={5}
        sx={{
          color: (theme) =>
            value >= 100
              ? theme.palette.success.main
              : theme.palette.primary.main,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          fontWeight={"500"}
          component="div"
          color="textSecondary"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
