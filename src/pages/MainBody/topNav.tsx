import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Toolbar,
  MenuItem,
  Menu,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";

import Logo from "../../core/Logo";
import Iconify from "../../core/Iconify";
import useUserStore from "../../store/userData";
import useMobile from "../../hooks/useMobile";
import useIsDrawerStore from "../../store/isDrawer";

const TopNav = () => {
  const isMobile = useMobile();

  const { data } = useUserStore((state) => ({
    data: state.data,
  }));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { open, setOpen } = useIsDrawerStore((state) => ({
    open: state.open,
    setOpen: state.setOpen,
  }));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(249, 250, 251, 0.8)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {isMobile ? (
              <IconButton onClick={handleDrawerToggle}>
                <Iconify icon="heroicons-outline:menu-alt-1" />
              </IconButton>
            ) : (
              <Logo />
            )}

            <Box display={"flex"} gap={"12px"}>
              {!isMobile && data?.shop && (
                <Stack
                  sx={{
                    background: (theme) => theme.palette.primary.light,
                    px: 1,
                    borderRadius: "10px",
                  }}
                  direction={"row"}
                  gap={"5px"}
                  alignItems={"center"}
                >
                  <Iconify icon="akar-icons:location" width={23} />
                  <Typography
                    component={"span"}
                    fontSize={"11px"}
                    fontWeight={"500"}
                  >
                    {data?.shop?.name.toUpperCase()}
                    <Typography fontWeight={"700"} fontSize={"13px"}>
                      {data?.shop?.area}
                    </Typography>
                  </Typography>
                </Stack>
              )}

              <IconButton size="small">
                <Badge
                  badgeContent={4}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "#FF6600",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#FFf",
                    },
                  }}
                >
                  <Iconify icon="solar:bell-bing-bold" width={23} />
                </Badge>
              </IconButton>
              <IconButton
                size="small"
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={"/assets/images/avatars/avatar_25.jpg"}
                  alt="profile"
                  sizes="small"
                />
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => alert("")}>
          <Iconify icon="eva:person-fill" sx={{ mr: 2 }} />
          Profile
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => alert("sdsd")}>
          <Iconify icon="eva:log-out-outline" sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default TopNav;
