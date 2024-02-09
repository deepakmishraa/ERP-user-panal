import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FNQ = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        py={1}
      >
        By continuing, you agree to WorldQart's{" "}
        <Link to={"#"}>
          <span>Conditions of </span>
        </Link>{" "}
        Use and
        <Link to={"#"}> Privacy Notice </Link>
      </Typography>
    </Box>
  );
};
export default FNQ;
