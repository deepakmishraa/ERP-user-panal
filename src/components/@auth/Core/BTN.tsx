import { Box, Button } from "@mui/material";

import { useLocation } from "react-router-dom";

interface IBtn {
  loader: boolean;
}
const BTN = ({ loader }: IBtn) => {
  const location = useLocation();
  return (
    <Box textAlign={"center"} pt={2} pb={1}>
      <Button
        type="submit"
        variant="contained"
        disabled={loader}
        // loader={loader}
        fullWidth
      >
        {location.pathname !== "/changepassword" ? "Continue" : "Confirm Now"}
      </Button>
    </Box>
  );
};
export default BTN;
