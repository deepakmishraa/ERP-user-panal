import { Box, FormControlLabel, Typography, Divider } from "@mui/material";
import Links from "@mui/material/Link";
import ButtonUI from "../../core/Button";
import Tosted from "../../core/Tosted";
import { Fragment, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SocialMedia from "../SocialMedia";
import { LoginService } from "../../services/authServices/LoginService";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import Cookies from "universal-cookie";
import { OutlineInput } from "../../core/InputField";
import useTokenStore from "../../store/token";
import { IState } from "../../models/IState";
import useUserStore from "../../store/userData";

export default function EmailLoginForm() {
  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  let navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  let netWorkStatus = useNetworkStatus();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState({
    isValid: true,
    message: "",
  });
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    isValid: false,
    message: "fill the password",
  });
  const [togglePassword, setTogglePassword] = useState(false);

  const cookies = new Cookies();
  const { setToken } = useTokenStore((state) => ({
    setToken: state.setToken,
  }));
  const { setData } = useUserStore((state) => ({
    setData: state.setData,
  }));

  const validateEmail = (emailValue: string) => {
    if (emailValue === "") {
      setEmailValid({
        isValid: false,
        message: "Fill in the email",
      });
      return false;
    } else if (!emailRegex.test(emailValue)) {
      setEmailValid({
        isValid: false,
        message: "Email format is incorrect",
      });
      return false;
    } else {
      setEmailValid({
        isValid: true,
        message: "",
      });
      return true;
    }
  };
  const emailHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };
  const passwordHandlerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    console.log(event.target.value.length);
    event.target.value.length < 8
      ? setPasswordValid({
          isValid: true,
          message: "Fill the password",
        })
      : setPasswordValid({
          isValid: false,
          message: "Fill the password",
        });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isPasswordValid = password.length >= 8;

    setPasswordValid({
      isValid: !isPasswordValid,
      message: isPasswordValid
        ? ""
        : "Password must be at least 8 characters long",
    });

    // Proceed with submission if both email and password are valid
    if (validateEmail(email) && isPasswordValid) {
      onSubmit({ email, password });
    }
  };

  const onSubmit = (data: { email: string; password: string }) => {
    setState({
      ...state,
      loader: true,
    });
    if (!netWorkStatus) {
      setState({
        tosted: true,
        loader: false,
        severity: "error",
        message: "No internet connection",
      });
    } else {
      const response = LoginService.loginHandler(data.email, data.password);
      response
        .then((res) => {
          setState({
            ...state,
            loader: false,
          });
          cookies.set("management-token", res.data.token);
          setToken(res.data.token);
          setData(res.data.data.user);

          // | "purchaseManager"
          // | "procurementManager"
          // | "allocationManager"
          // | "shopManager";

          console.log("Line No 132", res.data.data.user);

          if (res.data.data.user.role === "shopManager") {
            navigate("/shopmanager/add");
          } else if (res.data.data.user.role === "purchaseManager") {
            navigate("/order");
          } else if (res.data.data.user.role === "procurementManager") {
            navigate("/shop-order");
          } else if (res.data.data.user.role === "allocationManager") {
            navigate("/confirm-order");
          }
        })
        .catch((error) => {
          if (error.code == "ERR_NETWORK") {
            setState({
              tosted: true,
              loader: false,
              severity: "error",
              message: "No internet connection",
            });
          } else {
            setState({
              tosted: true,
              loader: false,
              severity: "error",
              message: error.response.data.message,
            });
          }
        });
    }
  };

  const handleClose = () => {
    if (tosted) {
      setTimeout(() => {
        setState({
          ...state,
          tosted: false,
        });
      }, 5000);
    }
  };
  const { loader, tosted, message, severity } = state;
  useEffect(() => {
    handleClose();
  }, [tosted]);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  useEffect(() => {
    handleClose();
  }, [tosted]);

  return (
    <Fragment>
      <Box width={"100%"}>
        <form onSubmit={handleSubmit} className="">
          <OutlineInput
            value={email}
            label="Email"
            type="text"
            handleInputChange={emailHandlerChange}
            error={
              emailValid.isValid === false ? emailValid.message : undefined
            }
            disabled={loader}
          />

          <OutlineInput
            togglePassword={togglePassword}
            setTogglePassword={setTogglePassword}
            value={password}
            type="password"
            label="Password "
            handleInputChange={passwordHandlerChange}
            handleTogglePassword={handleTogglePassword}
            error={passwordValid.isValid ? passwordValid.message : undefined}
            disabled={loader}
          />

          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  inputProps={{ "aria-label": "remember me" }}
                />
              }
              label="Remember Me"
            />
            <Link to={"/auth/user/forget"}>
              <Typography component={Links}>Forgot Password</Typography>
            </Link>
          </Box>
          <Box textAlign={"center"} pt={1}>
            <ButtonUI
              type="submit"
              variant="contained"
              color="primary"
              disabled={loader}
              loader={loader}
            >
              Continue
            </ButtonUI>
            <Typography variant="body2" py={1.5}>
              New Customer?{" "}
              <Link to={"/signup"}>
                <Typography component={Links} variant="body2">
                  Start Here
                </Typography>
              </Link>{" "}
            </Typography>
          </Box>
          <Divider>More</Divider>
          <SocialMedia />
        </form>
      </Box>
      <Tosted
        label={message}
        open={tosted}
        severity={severity}
        handleClose={handleClose}
      />
    </Fragment>
  );
}
