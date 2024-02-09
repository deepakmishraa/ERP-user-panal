import { Button } from "@mui/material";
import Iconify from "../Iconify";

interface IProps {
  title: string;
  onClickHandler: () => void;
}

const IconButton = ({ title, onClickHandler }: IProps) => {
  return (
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
