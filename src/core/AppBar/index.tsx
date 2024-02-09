import Bar from "@mui/material/AppBar";
// import Container from "../Container";
interface IAppBar {
  children: React.ReactNode;
  zIndex: number;
  color?: string;
}
const AppBar = ({ children, color, zIndex }: IAppBar) => {
  return (
    // <Container color={color}>
      <Bar
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + zIndex }}
        position="relative"
      >
        {children}
      </Bar>
    // </Container>
  );
};
export default AppBar;
