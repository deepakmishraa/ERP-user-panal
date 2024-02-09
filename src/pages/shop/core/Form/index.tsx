import { Box, Stack } from "@mui/material";
import { OutlineInput } from "../../../../core/InputField";
import { useState } from "react";
import { IState } from "../../../../models/IState";
import Contained from "../../../../core/Button/Contained";
import Tosted from "../../../../core/Tosted";
import { ShopService } from "../../../../services/ShopServies";
import useIsShopStore from "../../../../store/isShop";

type SubmitData = {
  name: string;
  area: string;
  city: string;
};

interface IProps {
  handleClose: () => void;
}

const Form = ({ handleClose }: IProps) => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");

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

  const [areaValid, setAreaValid] = useState({
    isValid: false,
    message: "Fill An Area",
  });
  const [cityValid, setCityValid] = useState({
    isValid: false,
    message: "Fill An City",
  });

  const { setActive } = useIsShopStore((state) => ({
    setActive: state.setActive,
  }));

  const nameHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value === "") {
      setNameValid({ isValid: true, message: "Fill An Name" });
    } else {
      setNameValid({ isValid: false, message: "" });
    }
  };

  const areaHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArea(event.target.value);
    if (event.target.value === "") {
      setAreaValid({ isValid: true, message: "Fill An Area" });
    } else {
      setNameValid({ isValid: false, message: "" });
    }
  };

  const cityHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    if (event.target.value === "") {
      setCityValid({ isValid: true, message: "Fill An City" });
    } else {
      setCityValid({ isValid: false, message: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setNameValid({
      isValid: name === "" ? true : false,
      message: "fill An Shop Name",
    });
    setAreaValid({
      isValid: area === "" ? true : false,
      message: "fill An Area",
    });

    setCityValid({
      isValid: city === "" ? true : false,
      message: "Fill An City ",
    });

    if (name !== "" && area !== "" && city !== "") {
      onSubmit({ name, area, city });
    }
  };

  const onSubmit = async ({ name, area, city }: SubmitData) => {
    setState({
      ...state,
      loader: true,
    });

    try {
      const response = await ShopService.addShopApi(name, area, city);
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
        <OutlineInput
          value={name}
          type="text"
          label="Name"
          handleInputChange={nameHandlerChange}
          error={nameValid.isValid ? nameValid.message : undefined}
          disabled={state.loader}
        />
        <Stack direction={"row"} gap={"10px"}>
          <OutlineInput
            value={area}
            type="text"
            label="Area"
            handleInputChange={areaHandlerChange}
            error={areaValid.isValid ? areaValid.message : undefined}
            disabled={state.loader}
          />

          <OutlineInput
            value={city}
            type="text"
            label="City"
            handleInputChange={cityHandlerChange}
            error={cityValid.isValid ? cityValid.message : undefined}
            disabled={state.loader}
          />
        </Stack>

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
