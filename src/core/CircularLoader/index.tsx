import CircularProgress from "@mui/material/CircularProgress";
const CircularLoader = () => {
  return (
    <CircularProgress
      size={30}
      sx={{
        color: "#121212",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-12px",
        marginLeft: "-12px",
        height: "25px",
      }}
    />
  );
};
export default CircularLoader;
