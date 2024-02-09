import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Popover,
  MenuItem,
  Menu,
} from "@mui/material";
import useStyles from "./styles";
import useModeStore from "../../store/mode";
import SpaceBetween from "../../core/SpaceBetween";
import { useState, MouseEvent } from "react";
import { BasicSearch } from "../../core/SearchBar";
import Logo from "../../core/Logo";
import Iconify from "../../core/Iconify";

const TopNav = () => {
  const { mode, setMode } = useModeStore((state) => ({
    mode: state.mode,
    setMode: state.setMode,
  }));
  const [searchInput, setSearchInput] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const searchInputHandler = (value: string) => {
    setSearchInput(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(249, 250, 251, 0.8)",
        }}
      >
        <Toolbar>
          <SpaceBetween width="100%" px={1}>
            <Box display={"flex"} gap={"70px"}>
              <Logo />
              <BasicSearch
                searchInputHandler={searchInputHandler}
                searchInput={searchInput}
                width={"250px"}
              />
            </Box>
            <Box display={"flex"} gap={"12px"}>
              <IconButton size="small">
                <img src={"/assets/icons/ic_flag_en.svg"} alt="profile" />
              </IconButton>
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
          </SpaceBetween>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
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

        <MenuItem onClick={() => alert("sdsd")}>
          <Iconify icon="eva:settings-outline" sx={{ mr: 2 }} />
          My Account
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