import { Container } from "@mui/material";
import Page from "../../core/Page";
import { Header } from "./helper/";
import { Paper } from "@mui/material";
import { EmailLoginForm } from "../../components/@auth";
// ----------------------------------------------------------------------

const Login = () => {
  return (
    <Page
      title="Amazon :User Sign In"
      description="here is the login page details"
    >
      <Container maxWidth="xs" sx={{ height: "100%", pt: 10 }}>
      <Paper elevation={2}>
          <Header title="Sign In" />
          <EmailLoginForm/>
        </Paper>
      </Container>
    </Page>
  );
};
export default Login;
