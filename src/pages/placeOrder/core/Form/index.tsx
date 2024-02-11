import { Box, Stack } from "@mui/material";
import { OutlineInput } from "../../../../core/InputField";
import { useState } from "react";
import { IState } from "../../../../models/IState";
import Contained from "../../../../core/Button/Contained";
import SRole from "../SRole";
import { SelectChangeEvent } from "@mui/material/Select";
import Tosted from "../../../../core/Tosted";
import WType from "../../../../core/WType";
import { PlaceOrderServices } from "../../../../services/PlaceOrder";
import useIsPlaceOrderStore from "../../../../store/isPlaceOrder";

type SubmitData = {
  name: string;
  quantity: string;
};

interface IProps {
  handleClose: () => void;
}

const Form = ({ handleClose }: IProps) => {
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState("");

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

  const [sRoleValid, setSRoleValid] = useState({
    isValid: false,
    message: "Select An Product",
  });

  const [wType, setWType] = useState("gram");
  const [sTypeValid, setSTypeValid] = useState({
    isValid: false,
    message: "Select An Weight Type",
  });

  const { setActive } = useIsPlaceOrderStore((state) => ({
    setActive: state.setActive,
  }));

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value == null) {
      setSRoleValid({
        isValid: true,
        message: "Select an role",
      });
    } else {
      setProduct(event.target.value);
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

  const quantityHandlerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuantity(event.target.value);
    if (event.target.value === "") {
      setNameValid({ isValid: true, message: "Fill An Name" });
    } else {
      setNameValid({ isValid: false, message: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setNameValid({
      isValid: quantity === "" ? true : false,
      message: "Fill An Quantity",
    });
    setSRoleValid({
      isValid: product === "" ? true : false,
      message: "Select An Product",
    });

    if (product !== "" && quantity !== "") {
      onSubmit({ name: product, quantity });
    }
  };

  const onSubmit = async ({ name, quantity }: SubmitData) => {
    setState({
      ...state,
      loader: true,
    });

    try {
      const response = await PlaceOrderServices.AddOrderApi(name, +quantity);
      if (response.status === 200) {
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
          uRole={product}
          handleChange={handleChange}
          error={sRoleValid.isValid ? sRoleValid.message : undefined}
        />

        <Stack direction={"row"} gap={"20px"}>
          <OutlineInput
            value={quantity}
            type="number"
            label="Quantity"
            handleInputChange={quantityHandlerChange}
            error={nameValid.isValid ? nameValid.message : undefined}
            disabled={state.loader}
          />
          <WType
            uRole={wType}
            handleChange={weightChange}
            error={sTypeValid.isValid ? sTypeValid.message : undefined}
          />
        </Stack>

        <br />
        <Box textAlign={"center"} pt={1}>
          <Contained
            type="submit"
            variant="text"
            disabled={loader}
            loader={loader}
          >
            Add Order
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
