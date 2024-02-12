import { Box, Typography } from "@mui/material";

const NoData = () => {
  return (
    <Box sx={{ borderRadius: "0px 0px 20px 20px", height: "90px" }}>
      <Typography textAlign={"center"} fontWeight={"500"} pt={2} color={"#000"}>
        No Data Found
      </Typography>
    </Box>
  );
};
export default NoData;
