import { Box, Skeleton } from "@mui/material";

const TLoader = () => {
  return (
    <Box sx={{ borderRadius: "0px 0px 20px 20px", height: "90px" }}>
      <Skeleton
        variant="rectangular"
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
        width={"100%"}
        height={50}
      />
    </Box>
  );
};
export default TLoader;
