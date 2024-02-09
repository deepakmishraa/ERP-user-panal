import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Barchart, PieChart } from "../../core/Charts";
import H1 from "../../core/H1";
const Dashboard = () => {
  const cardList = [
    {
      id: 1,
      title: "Weekly Sales",
      num: "714k",
      url: "/assets/icons/glass/ic_glass_bag.png",
    },
    {
      id: 2,
      title: "New Users",
      num: "1.3m",
      url: "/assets/icons/glass/ic_glass_users.png",
    },
    {
      id: 3,
      title: "Item Orders",
      num: "1.72m",
      url: "/assets/icons/glass/ic_glass_buy.png",
    },
    {
      id: 4,
      title: "Bug Reports",
      num: "234",
      url: "/assets/icons/glass/ic_glass_message.png",
    },
  ];
  return (
    <>
      <Container>
        <H1 title="Hi, Welcome back 👋" />

        <Box sx={{ width: "100%", display: "flex", gap: "30px", mt: 5 }}>
          {cardList.map((data, index) => {
            return (
              <Stack
                component={Paper}
                elevation={1}
                height={"140px"}
                width={"100%"}
              >
                <Box display={"flex"} gap={"20px"} alignItems={"center"}>
                  <img src={data.url}></img>
                  <Typography component={"span"} variant="h3">
                    {data.num}
                    <Typography
                      fontWeight={"600"}
                      fontSize={"14px"}
                      color={(theme) => theme.palette.divider}
                    >
                      {data.title}
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Box>
        <Box mt={2} display={"flex"} gap={"30px"} height={"500px"}>
          <Stack width={"70%"} component={Paper} elevation={2}>
            <Typography variant="h4" component={"span"} gutterBottom>
              Website Visits
              <Typography color={(theme) => theme.palette.divider}>
                (+43%) than last year
              </Typography>
            </Typography>
            <Divider flexItem={true} />
            <Box pt={1.5}>
              <Barchart />
            </Box>
          </Stack>
          <Stack width={"30%"} component={Paper} elevation={2}>
            <Typography variant="h4" component={"span"} gutterBottom>
              Current Visits
            </Typography>
            <Box sx={{ height: "100%", width: "100%" }}>
              <Box mr={0} sx={{ height: "100%", width: "100%" }}>
                <PieChart />
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box mt={2} display={"flex"} gap={"30px"} height={"500px"}>
          <Stack width={"70%"} component={Paper} elevation={2}>
            <Typography variant="h4" component={"span"} gutterBottom>
              Website Visits
              <Typography color={(theme) => theme.palette.divider}>
                (+43%) than last year
              </Typography>
            </Typography>
            <Divider flexItem={true} />
            <Box pt={1.5}>
              <Barchart />
            </Box>
          </Stack>
          <Stack width={"30%"} component={Paper} elevation={2}>
            <Typography variant="h4" component={"span"} gutterBottom>
              Current Visits
            </Typography>
            <Box sx={{ height: "100%", width: "100%" }}>
              <Box mr={0} sx={{ height: "100%", width: "100%" }}>
                <PieChart />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
