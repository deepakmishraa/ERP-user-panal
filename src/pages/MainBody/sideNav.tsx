import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, ListItemIcon } from "@mui/material";
import { isAllNav, navigationData } from "./Data";
import useUserStore from "../../store/userData";
import { useMemo, useState } from "react";
import { NavCard } from "./core";
import useMobile from "../../hooks/useMobile";
import useIsDrawerStore from "../../store/isDrawer";

const SideNav = () => {
  const { data } = useUserStore((state) => ({
    data: state.data,
  }));
  const isMobile = useMobile();

  const { open, setOpen } = useIsDrawerStore((state) => ({
    open: state.open,
    setOpen: state.setOpen,
  }));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const navData = useMemo(() => {
    // Combine role-specific and common navigation items
    const roleSpecificNav =
      navigationData[data?.role ? data.role : "purchaseManager"] || [];
    return [...roleSpecificNav, ...isAllNav];
  }, [data]);
  const drawerWidth = 280;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        position: "relative",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "rgb(249,250,251)",
        },
      }}
      anchor="left"
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Toolbar></Toolbar>
      <Box sx={{ position: "relative", height: "100%" }}>
        <Box p={1.3}>
          <List>
            <ListItem
              sx={{
                height: "80px",
                border: (theme) => `1px dashed ${theme.palette.divider}`,
                mb: 2,
              }}
              selected
            >
              <ListItemIcon>
                <Avatar
                  src={"/assets/images/avatars/avatar_25.jpg"}
                  sx={{ width: "45px", height: "45px", mr: "10px" }}
                />
              </ListItemIcon>
              <ListItemText primary={data?.name} secondary={data?.role} />
            </ListItem>
          </List>

          <List>
            {navData.map((data, index) => {
              return <NavCard data={data} key={index} />;
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
export default SideNav;
