import { Box, Typography } from "@mui/material";

interface IHead {
  title: string;
  subTitle: string;
}
const Head = ({ title, subTitle }: IHead) => {
  return (
    <Box py={1}>
      <Typography variant="h4" lineHeight={"35px"}>
        {title}
      </Typography>
      <Typography variant="h6" color={"#000"}>
        {subTitle}
      </Typography>
    </Box>
  );
};
export default Head;
