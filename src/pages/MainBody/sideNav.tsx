import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, IconButton, ListItemIcon, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../../core/Logo";
import useStyles from "./styles";
import { isAllNav, navigationData } from "./Data";
import Iconify from "../../core/Iconify";
import useUserStore from "../../store/userData";
import useRoleStore from "../../store/role";
import { useMemo } from "react";

const SideNav = () => {
  const { classes } = useStyles();
  const { data } = useUserStore((state) => ({
    data: state.data,
  }));

  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  const navData = useMemo(() => {
    // Combine role-specific and common navigation items
    const roleSpecificNav = navigationData[role] || [];
    return [...roleSpecificNav, ...isAllNav];
  }, [role]);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      component={Paper}
      anchor="left"
    >
      <Toolbar>
        <Logo />
      </Toolbar>
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
              <ListItemText primary={data?.name} secondary={data?.email} />
            </ListItem>
          </List>

          <List>
            {navData.map((data, index) => {
              return (
                <NavLink
                  to={data.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  key={index}
                >
                  {({ isActive }) => (
                    <ListItem
                      selected={isActive == true ? true : false}
                      color="primary"
                    >
                      <ListItemIcon>
                        <IconButton color={isActive ? "primary" : "default"}>
                          <Iconify icon={data.iconify} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText primary={data.name} />
                    </ListItem>
                  )}
                </NavLink>
              );
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
export default SideNav;
