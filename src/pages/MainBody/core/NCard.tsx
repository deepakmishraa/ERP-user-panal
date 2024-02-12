import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { IconButton, ListItem } from "@mui/material";
import { lightPalette } from "../../../assets/palette/lightPalette";
import { NavLink } from "react-router-dom";
import { IMenuItem } from "../Data";
import Iconify from "../../../core/Iconify";
interface IProps {
  data: IMenuItem;
}

const NCard = ({ data }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {data.list?.length === 0 || data.list === undefined ? (
        <NavLink
          to={data.path ? data.path : "#"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <ListItem selected={isActive == true ? true : false}>
              <ListItemIcon>
                <IconButton color={isActive ? "primary" : "default"}>
                  <Iconify icon={data.iconify} />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={data.name} />
            </ListItem>
          )}
        </NavLink>
      ) : (
        <>
          <ListItem
            onClick={handleClick}
            selected={open == true ? true : false}
          >
            <ListItemIcon>
              <IconButton color={open == true ? "primary" : "default"}>
                <Iconify icon={data.iconify} />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={data.name} />
            <ListItemIcon>
              <Iconify
                icon={
                  open == true
                    ? "iconamoon:arrow-down-2-light"
                    : "iconamoon:arrow-right-2-light"
                }
                sx={{
                  color:
                    open == true
                      ? lightPalette.primary.main
                      : lightPalette.secondary.main,
                }}
              />
            </ListItemIcon>
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                pl: 0,
                ml: 2.5,
                position: "relative", // Needed to position the "::after" pseudo-element correctly
                "&::before": {
                  content: '""', // Double quotes are needed around an empty string
                  display: "block",
                  position: "absolute",
                  zIndex: 5,
                  left: -5,
                  top: 0, // You might want to adjust this depending on where you want the pseudo-element to appear
                  height: 8,
                  width: 8,
                  borderRadius: "50%", // Changed to 50% to make it a circle
                  opacity: 1,
                  background: `${lightPalette.secondary.lighter}`,
                  border: `1px solid ${lightPalette.secondary.main}`,
                },
                borderLeft: `2px solid ${lightPalette.secondary.main}`,
              }}
            >
              {data.list?.map((data, index) => {
                return (
                  <>
                    <NavLink
                      to={data.path ? data.path : "#"}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      key={index}
                    >
                      {({ isActive }) => (
                        <ListItem selected={isActive == true ? true : false}>
                          <ListItemIcon>
                            <IconButton
                              color={isActive == true ? "primary" : "default"}
                            >
                              <Iconify icon={data.iconify} />
                            </IconButton>
                          </ListItemIcon>
                          <ListItemText primary={data.name} />
                        </ListItem>
                      )}
                    </NavLink>
                  </>
                );
              })}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};
export default NCard;
