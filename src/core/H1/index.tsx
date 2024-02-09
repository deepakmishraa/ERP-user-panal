import { Typography } from "@mui/material";
interface IProps {
  title: string;
}

const H1 = ({ title }: IProps) => {
  return (
    <Typography variant="h1" fontSize={"1.6rem"} fontWeight={600}>
      {title}
    </Typography>
  );
};
export default H1;
