import { Box } from "@mui/material";
import { OutlineInput } from "../../../../core/InputField";
import { useState } from "react";
import { IState } from "../../../../models/IState";
import Contained from "../../../../core/Button/Contained";
import SRole from "../SRole";
import { removeHyphens } from "../../../../hooks/removeHypics";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UserService } from "../../../../services/UserServices";
import Tosted from "../../../../core/Tosted";
import useIsUserStore from "../../../../store/isUser";

type SubmitData = {
  name: string;
  email: string;
  role: string;
  mobileNo: string;
};

interface IProps {
  handleClose: () => void;
}

const Form = ({ handleClose }: IProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [sRole, setSRole] = useState<string>("");
  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const [nameValid, setNameValid] = useState({
    isValid: false,
    message: "Fill the Name",
  });

  const [emailValid, setEmailValid] = useState({
    isValid: false,
    message: "Fill An Email",
  });
  const [mobValid, setMobValid] = useState({
    isValid: false,
    message: "Fill the Mobile No",
  });

  const [uRole, setURole] = useState("");
  const { setActive } = useIsUserStore((state) => ({
    setActive: state.setActive,
  }));

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value == null) {
      setSRoleValid({
        isValid: true,
        message: "Select an role",
      });
    } else {
      setURole(event.target.value);
      setSRoleValid({
        isValid: false,
        message: "select an Role",
      });
    }
  };

  const [sRoleValid, setSRoleValid] = useState({
    isValid: false,
    message: "Select An Role",
  });

  const nameHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value === "") {
      setNameValid({ isValid: true, message: "Fill An Name" });
    } else {
      setNameValid({ isValid: false, message: "" });
    }
  };

  const emailHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmailValid({
      isValid: !emailRegex.test(event.target.value),
      message:
        event.target.value === ""
          ? "fill the email"
          : "Email formate in Incorrect",
    });
    setEmail(event.target.value);
  };
  const mobHandlerChange = (num: React.ChangeEvent<HTMLInputElement>) => {
    const ImoNo = num.target.value.replace(/[^\d]/g, "");
    const numberLength = ImoNo.length;

    if (numberLength === 0) {
      setMob("");
      setMobValid({
        isValid: true,
        message: "fill in a valid Mobile No ",
      });
    } else if (numberLength <= 3) {
      setMob(ImoNo);
    } else if (numberLength <= 6) {
      setMob(`${ImoNo.slice(0, 3)}-${ImoNo.slice(3, 6)}`);
      setMobValid({
        isValid: numberLength === 6 ? false : true,
        message: "fill in a valid Mobile No",
      });
    } else if (numberLength <= 10) {
      setMob(`${ImoNo.slice(0, 3)}-${ImoNo.slice(3, 6)}-${ImoNo.slice(6, 10)}`);
      setMobValid({
        isValid: numberLength === 10 ? false : true,
        message: "fill in a valid Mobile No",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setNameValid({
      isValid: name === "" ? true : false,
      message: "fill in the Business Name",
    });
    setEmailValid({
      isValid: email === "" ? true : false,
      message: "fill in the email",
    });

    setMobValid({
      isValid: mob.length === 12 ? false : true,
      message: "Please enter a valid mobile no.",
    });
    setSRoleValid({
      isValid: uRole === "" ? true : false,
      message: "Select An Role",
    });

    if (name !== "" && email !== "" && uRole !== "" && mob.length === 12) {
      const mobileNo = removeHyphens(mob);
      onSubmit({ name, email, role: uRole, mobileNo });
    }
  };

  const onSubmit = async ({ name, email, role, mobileNo }: SubmitData) => {
    setState({
      ...state,
      loader: true,
    });

    try {
      const response = await UserService.addUserApi(
        name,
        email,
        +mobileNo,
        role
      );
      if (response.status === 201) {
        // activeHandler(true);
        setState({
          tosted: true,
          loader: false,
          severity: "success",
          message: response.data.message,
        });
        setActive(true);
      } else {
        setState({
          tosted: true,
          loader: false,
          severity: "error",
          message: response.data.message,
        });
      }
    } catch (error: any) {
      setState({
        tosted: true,
        loader: false,
        severity: "error",
        message: error.response.data.message,
      });
    }
  };

  const { loader, tosted, message, severity } = state;

  return (
    <>
      <form className="column" onSubmit={handleSubmit}>
        <OutlineInput
          value={name}
          type="text"
          label="Name"
          handleInputChange={nameHandlerChange}
          error={nameValid.isValid ? nameValid.message : undefined}
          disabled={state.loader}
        />

        <OutlineInput
          value={email}
          type="text"
          label="Email"
          handleInputChange={emailHandlerChange}
          error={emailValid.isValid ? emailValid.message : undefined}
          disabled={state.loader}
        />

        <OutlineInput
          value={mob}
          type="text"
          label="Mobile No"
          handleInputChange={mobHandlerChange}
          error={mobValid.isValid ? mobValid.message : undefined}
          disabled={state.loader}
        />

        <SRole
          uRole={uRole}
          handleChange={handleChange}
          error={sRoleValid.isValid ? sRoleValid.message : undefined}
        />

        <br />
        <Box textAlign={"center"} pt={1}>
          <Contained
            type="submit"
            variant="text"
            disabled={loader}
            loader={loader}
          >
            Add Now
          </Contained>
        </Box>
      </form>
      <Tosted
        label={message}
        open={tosted}
        severity={severity}
        handleClose={handleClose}
      />
    </>
  );
};
export default Form;
