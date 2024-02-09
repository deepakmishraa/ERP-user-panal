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
const Popup = ({
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
        vertical: vertical ? vertical : "bottom",
        horizontal: horizontal ? horizontal : "left",
      }}
      sx={{
        fontSize: "20px",
        fontWeight: "500",
        textAlign: "center",
        zIndex: (theme) => theme.zIndex.appBar + 50,
      }}
    >
      <Alert severity={severity ? severity : "success"}>{label}</Alert>
    </Snackbar>
  );
};

export default Popup;
