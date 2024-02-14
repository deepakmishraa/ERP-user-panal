import React from "react";
import Box from "@mui/material/Box";
import SideNav from "./sideNav";
import TopNav from "./topNav";
import { Toolbar } from "@mui/material";
import useMobile from "../../hooks/useMobile";

interface IProps {
  children?: React.ReactNode;
}
const Body = ({ children }: IProps) => {
  const isMobile = useMobile();

  const laptop = {
    width: `calc(100% - 280px)`,
    ml: "280px",
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TopNav />
      <SideNav />

      <Box sx={!isMobile ? laptop : undefined} height="100vh" component="main">
        <Toolbar></Toolbar>
        <Box p={2}> {children}</Box>
      </Box>
    </Box>
  );
};
export default Body;
