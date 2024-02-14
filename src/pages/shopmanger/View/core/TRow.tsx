import {
  TableRow,
  TableCell,
  Stack,
  Avatar,
  Typography,
  IconButton,
  SelectChangeEvent,
  Button,
  Checkbox,
} from "@mui/material";
import Iconify from "../../../../core/Iconify";
import { useState, useEffect } from "react";
import QuentityEnter from "../../../../core/QuentityEnter";
import { PlaceOrderServices } from "../../../../services/PlaceOrder";
import { IState } from "../../../../models/IState";
import CircularLoader from "../../../../core/CircularLoader";
import Tosted from "../../../../core/Tosted";
import { IOrderList } from "../../../../models/IOrderList";
import WType from "../../../../components/WType";
import { IUmoType } from "../../../../models/IUmoType";
import useIsPlaceOrderStore from "../../../../store/isPlaceOrder";
// ----------------------------------------------------------------------

interface IProps {
  data: IOrderList;
  index: number;
  isSelected: boolean;
  handleSelect: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

type SubmitData = {
  name: string;
  quantity: number;
};
// ----------------------------------------------------------------------
const TRow = ({ data, index, isSelected, handleSelect }: IProps) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [wType, setWType] = useState<IUmoType>(
    data.UOM === "Kg" ? "Kg" : "PCS"
  );
  const [product, setProduct] = useState<IOrderList>(data);

  const { active, setActive } = useIsPlaceOrderStore((state) => ({
    active: state.active,
    setActive: state.setActive,
  }));

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const increaseClickHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decreaseClickHandler = () => {
    setQuantity((prevQuantity) =>
      quantity === 0 ? quantity : prevQuantity - 1
    );
  };
  const InputHandler = (value: string) => {
    if (+value > -1) {
      setQuantity((prevQuantity) => (prevQuantity = +value));
    }
  };

  const weightChange = (event: SelectChangeEvent) => {
    if (event.target.value === "Kg" || event.target.value === "PCS") {
      setWType(event.target.value);
    }
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product]);

  const placeOrderHandler = async (name: string, quantity: number) => {
    setState({
      ...state,
      loader: true,
    });

    try {
      const response = await PlaceOrderServices.AddOrderApi(
        name,
        quantity,
        wType
      );
      if (response.status === 200) {
        setState({
          tosted: true,
          loader: false,
          severity: "success",
          message: response.data.message,
        });
        setQuantity(quantity);
        setProduct({ ...data, quantity: quantity });
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

  const deleteItemHandler = async () => {
    setState({
      ...state,
      loader: true,
    });
    try {
      setState({ ...state, loader: true }); // Set loader to true when the operation starts
      const selected = [data.productId];
      const response = await PlaceOrderServices.deleteRequirementItem(selected);
      if (response.status === 200) {
        setState({
          loader: false,
          tosted: true,
          message: response.data.message,
          severity: "success",
        });

        setActive(true);
      } else {
        setState({
          loader: false,
          tosted: true,
          message: "Some thing went wrong",
          severity: "error",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setState({
        loader: false,
        tosted: true,
        message: errorMessage,
        severity: "error",
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

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        key={index}
        sx={{
          cursor: "pointer",
          background: (theme) =>
            index % 2 === 1
              ? theme.palette.background.default
              : theme.palette.background.paper,
        }}
      >
        <TableCell align="center">
          <Checkbox
            checked={isSelected}
            onChange={(event) => handleSelect(event, data.productId)}
            inputProps={{
              "aria-labelledby": `checkbox-list-label-${data.productId}`,
            }}
          />
        </TableCell>
        <TableCell align="left">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              alt={product.productName}
              src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
            />
            <Typography variant="subtitle2" noWrap>
              {product.productName}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">{product.category.name}</TableCell>

        <TableCell align="center">
          <QuentityEnter
            quantity={quantity}
            increaseClickHandler={increaseClickHandler}
            decreaseClickHandler={decreaseClickHandler}
            InputHandler={InputHandler}
          />
        </TableCell>
        <TableCell align="center">
          <WType uRole={wType} handleChange={weightChange} />
        </TableCell>
        <TableCell align="right">
          <Stack direction={"row"} gap={"5px"} justifyContent={"end"}>
            {product.quantity > 0 ? (
              <Stack direction={"row"} gap={"4px"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  sx={{ height: "40px" }}
                  disabled={data.quantity == quantity ? true : false}
                  onClick={() => placeOrderHandler(data.productId, quantity)}
                >
                  {!state.loader ? `Update` : <CircularLoader />}
                </Button>

                <IconButton
                  sx={{ color: "error.main" }}
                  onClick={deleteItemHandler}
                >
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Stack>
            ) : (
              <Button
                variant="contained"
                disabled={quantity > 0 ? false : true}
                sx={{ height: "40px" }}
                onClick={() => placeOrderHandler(data.productId, quantity)}
              >
                {!state.loader ? "Add To Cart" : <CircularLoader />}
              </Button>
            )}
          </Stack>
        </TableCell>
      </TableRow>
      <Tosted
        label={message}
        open={tosted}
        severity={severity}
        handleClose={handleClose}
      />
    </>
  );
};
export default TRow;
