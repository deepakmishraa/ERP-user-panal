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
import { INProduct } from "../../../../models/INProduct";
import { PlaceOrderServices } from "../../../../services/PlaceOrder";
import { IState } from "../../../../models/IState";
import CircularLoader from "../../../../core/CircularLoader";
import Tosted from "../../../../core/Tosted";
import WType from "../../../../components/WType";
import { IUmoType } from "../../../../models/IUmoType";
import useMobile from "../../../../hooks/useMobile";
// ----------------------------------------------------------------------
interface IProps {
  data: INProduct;
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
  const [quantity, setQuantity] = useState(data.requirementQuantity);
  const [wType, setWType] = useState<IUmoType>(data.UOM);
  const [product, setProduct] = useState<INProduct>(data);
  const isMobile = useMobile();

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
    setQuantity(product.requirementQuantity);
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
        setProduct({ ...data, requirementQuantity: quantity });
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
            onChange={(event) => handleSelect(event, data._id)}
            inputProps={{
              "aria-labelledby": `checkbox-list-label-${data._id}`,
            }}
          />
        </TableCell>
        <TableCell align="left">
          {isMobile ? (
            data.name.substring(0, 30)
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar
                alt={product.name}
                src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
              />
              <Typography variant="subtitle2" noWrap>
                {product.name}
              </Typography>
            </Stack>
          )}
        </TableCell>
        {!isMobile && (
          <TableCell align="center">{product.category.name}</TableCell>
        )}

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
            {product.requirementQuantity > 0 ? (
              <Stack direction={"row"} gap={"4px"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  sx={{ height: "40px" }}
                  disabled={data.requirementQuantity == quantity ? true : false}
                  onClick={() => placeOrderHandler(data._id, quantity)}
                >
                  {!state.loader ? `Update` : <CircularLoader />}
                </Button>

                <IconButton sx={{ color: "error.main" }}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Stack>
            ) : (
              <Button
                variant="contained"
                disabled={quantity > 0 ? false : true}
                sx={{ height: "40px" }}
                onClick={() => placeOrderHandler(data._id, quantity)}
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
