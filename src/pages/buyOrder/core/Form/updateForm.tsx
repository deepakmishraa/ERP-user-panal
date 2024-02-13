import { Avatar, Box, Stack, Typography } from "@mui/material";
import { OutlineInput } from "../../../../core/InputField";
import { useState } from "react";
import { IState } from "../../../../models/IState";
import Contained from "../../../../core/Button/Contained";
import { SelectChangeEvent } from "@mui/material/Select";
import { UserService } from "../../../../services/UserServices";
import Tosted from "../../../../core/Tosted";
import useIsUserStore from "../../../../store/isUser";
import WType from "../../../../core/WType";
import { IOrderList } from "../../../../models/IOrderList";
import TUpdateForm from "./TUpdate";
import { shoplist } from "../../data";
import ShopTable from "./ShopTable";

type SubmitData = {
  name: string;
  email: string;
  role: string;
  mobileNo: string;
};

interface IProps {
  handleClose: () => void;
  data: IOrderList;
}

const UpdateForm = ({ handleClose, data }: IProps) => {
  const [name, setName] = useState("");

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

  const [uRole, setURole] = useState(data.productId);
  const [sRoleValid, setSRoleValid] = useState({
    isValid: false,
    message: "Select An Product",
  });

  const [wType, setWType] = useState("kilogram");
  const [sTypeValid, setSTypeValid] = useState({
    isValid: false,
    message: "Select An Weight Type",
  });

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

  const weightChange = (event: SelectChangeEvent) => {
    if (event.target.value == null) {
      setSTypeValid({
        isValid: true,
        message: "Select an role",
      });
    } else {
      setWType(event.target.value);
      setSTypeValid({
        isValid: false,
        message: "select an Role",
      });
    }
  };

  const nameHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value === "") {
      setNameValid({ isValid: true, message: "Fill An Name" });
    } else {
      setNameValid({ isValid: false, message: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setNameValid({
      isValid: name === "" ? true : false,
      message: "fill Name",
    });
    setSRoleValid({
      isValid: uRole === "" ? true : false,
      message: "Select An Role",
    });

    // if (name !== "" && email !== "" && uRole !== "" && mob.length === 12) {
    // onSubmit({ name, email, role: uRole, mobileNo });
    // }
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
        <Stack direction="row" alignItems="center" spacing={1} pb={2}>
          <Avatar
            alt={data.productName}
            src={`/assets/images/avatars/avatar_${1 + 1}.jpg`}
            sx={{ height: "40px", width: "40px" }}
          />
          <Typography variant="subtitle2" noWrap>
            {data.productName} <br />
            {data.quantity} Kg
          </Typography>
        </Stack>

        <Stack direction={"row"} gap={"20px"}>
          <OutlineInput
            value={name}
            type="text"
            label="Shop No"
            handleInputChange={nameHandlerChange}
            error={nameValid.isValid ? nameValid.message : undefined}
            disabled={state.loader}
          />
          <OutlineInput
            value={name}
            type="text"
            label="Quantity"
            handleInputChange={nameHandlerChange}
            error={nameValid.isValid ? nameValid.message : undefined}
            disabled={state.loader}
          />
          <WType
            uRole={wType}
            handleChange={weightChange}
            error={sTypeValid.isValid ? sTypeValid.message : undefined}
          />
        </Stack>

        <ShopTable />

        <Box textAlign={"center"} pt={1}>
          <Contained
            type="submit"
            variant="text"
            disabled={loader}
            loader={loader}
          >
            Update Now
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
export default UpdateForm;
