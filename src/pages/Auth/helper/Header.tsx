import Logo from "../../../core/Logo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

interface IProps {
  title: string;
}
const Header = ({ title }: IProps) => {
  return (
    <Stack>
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Logo />
      </Box>
      <Box width={"100%"} py={1}>
        <Typography variant="h1" fontWeight={"600"} gutterBottom>
          {title}
        </Typography>
      </Box>
    </Stack>
  );
};
export default Header;
