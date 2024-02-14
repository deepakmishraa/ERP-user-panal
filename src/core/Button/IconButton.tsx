import { Button, Tooltip } from "@mui/material";
import Iconify from "../Iconify";
import useMobile from "../../hooks/useMobile";
import IconBtn from "@mui/material/IconButton";

interface IProps {
  title: string;
  onClickHandler: () => void;
}

const IconButton = ({ title, onClickHandler }: IProps) => {
  const isMobile = useMobile();
  return isMobile ? (
    <Tooltip title={title}>
      <IconBtn color="secondary" onClick={onClickHandler}>
        <Iconify icon="eva:plus-fill" />
      </IconBtn>
    </Tooltip>
  ) : (
    <Button
      variant="contained"
      startIcon={<Iconify icon="eva:plus-fill" />}
      color="secondary"
      onClick={onClickHandler}
    >
      {title}
    </Button>
  );
};
export default IconButton;
