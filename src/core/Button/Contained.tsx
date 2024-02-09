import Button from "@mui/material/Button";
import CircularLoader from "../CircularLoader";
import { IButton } from "./interface";
const Contained = ({
  type,
  disabled,
  loader,
  children,
}: IButton) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      variant="contained"
      fullWidth
      sx={{ fontSize: "13px", textTransform: "uppercase" }}
    >
      {children}
      {loader && <CircularLoader />}
    </Button>
  );
};
export default Contained;
