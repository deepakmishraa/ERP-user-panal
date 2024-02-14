import { Stack } from "@mui/material";
import H1 from "../H1";
import { IconBtn } from "../Button";

interface IProps {
  title: string;
  iconTitle: string;
  onClickHandler: () => void;
}

const MainHead = ({ title, iconTitle, onClickHandler }: IProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <H1 title={title} />

      <IconBtn title={iconTitle} onClickHandler={onClickHandler} />
    </Stack>
  );
};
export default MainHead;
