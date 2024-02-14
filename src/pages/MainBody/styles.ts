import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: "layout" })((theme) => ({
  mainLayout: {
    padding: theme.spacing(2),
    position: "relative",
  },
}));
export default useStyles;
