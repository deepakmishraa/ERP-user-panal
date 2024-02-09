import React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}
type tostedProps = {
  label: string;
  open: boolean;
  severity?: "error" | "warning" | "info" | "success";
  handleClose: () => void;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
};
const Tosted = ({
  label,
  open,
  severity,
  handleClose,
  vertical,
  horizontal,
}: tostedProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={label}
      anchorOrigin={{
        vertical: vertical ? vertical : "top",
        horizontal: horizontal ? horizontal : "right",
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 1000,
      }}
    >
      <Alert severity={severity ? severity : "success"} variant="standard">
        {label}
      </Alert>
    </Snackbar>
  );
};

export default Tosted;
