import { makeStyles } from "tss-react/mui";
const drawerWidth = 280;

const useStyles = makeStyles({ name: "layout" })((theme) => ({
  mainLayout: {
    padding: theme.spacing(2),
    position: "relative",
  },
  drawer: {
    width: drawerWidth,
    position: "relative",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      background: "rgb(249,250,251)",
    },
  },
}));
export default useStyles;
