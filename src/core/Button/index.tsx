import Button from "@mui/material/Button";
import CircularLoader from "../CircularLoader";
import { IButton } from "./interface";

const ButtonUI = ({
  type,
  variant,
  disabled,
  loader,
  children,
  top,
  color,
}: IButton) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
      size="large"
      sx={{ px: 20 }}
      fullWidth
    >
      {children}
      {loader && <CircularLoader />}
    </Button>
  );
};

export default ButtonUI;

export { default as IconBtn } from "./IconButton";
