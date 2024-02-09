import CenterBox from "../CenterBox";
import Box from "@mui/material/Container";

interface IContainer {
  children: React.ReactNode;
  color?: string;
}
const Container = ({ children, color }: IContainer) => {
  return (
    <CenterBox height="100%">
      <Box
        sx={{
          p: 0,
          m: 0,
          background: !color ? "#eaeded" : color,
        }}
      >
        {children}
      </Box>
    </CenterBox>
  );
};
export default Container;
