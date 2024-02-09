import { Box, Stack } from "@mui/material";
import { OutlineInput } from "../../../../core/InputField";
import { useState } from "react";
import { IState } from "../../../../models/IState";
import Contained from "../../../../core/Button/Contained";
import Tosted from "../../../../core/Tosted";
import { ShopService } from "../../../../services/ShopServies";
import useIsShopStore from "../../../../store/isShop";
import SRole from "../SRole";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";

type SubmitData = {
  uRole: string;
};

interface IProps {
  handleClose: () => void;
}

const Form = ({ handleClose }: IProps) => {
  const [uRole, setURole] = useState("");
  let { id } = useParams();

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

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

  const { setActive } = useIsShopStore((state) => ({
    setActive: state.setActive,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSRoleValid({
      isValid: uRole === "" ? true : false,
      message: "Select An Role",
    });

    if (uRole !== "") {
      onSubmit({ uRole });
    }
  };

  const onSubmit = async ({ uRole }: SubmitData) => {
    setState({
      ...state,
      loader: true,
    });

    try {
      const response = await ShopService.assignUserApi(uRole, id);
      if (response.status === 201) {
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
        <SRole
          uRole={uRole}
          handleChange={handleChange}
          error={sRoleValid.isValid ? sRoleValid.message : undefined}
        />

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
