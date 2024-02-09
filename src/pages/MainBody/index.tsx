import React from "react";
import Box from "@mui/material/Box";
import SideNav from "./sideNav";
import TopNav from "./topNav";
import { Toolbar } from "@mui/material";

interface IProps {
  children?: React.ReactNode;
}
const Body = ({ children }: IProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <SideNav />
      <Box
        sx={{
          width: `calc(100% - 280px)`,
          ml: "280px",
          height: "100vh",
        }}
        component="main"
      >
        <TopNav />
        <Toolbar></Toolbar>
        <Box p={2}> {children}</Box>
      </Box>
    </Box>
  );
};
export default Body;
