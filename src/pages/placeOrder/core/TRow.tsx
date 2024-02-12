import {
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Popover,
  MenuItem,
  Tooltip,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { Label } from "../../../core/Label";
import Iconify from "../../../core/Iconify";
import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { IPlaceOrder } from "../../../models/IPlaceOrder";
import QuentityEnter from "../../../core/QuentityEnter";
import WType from "./WType";
// ----------------------------------------------------------------------
interface IProps {
  data: IPlaceOrder;
  index: number;
}
// ----------------------------------------------------------------------
const TRow = ({ data, index }: IProps) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [wType, setWType] = useState("");
  const [sTypeValid, setSTypeValid] = useState({
    isValid: false,
    message: "Select An Weight Type",
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

  return (
    <>
      <TableRow hover role="checkbox" key={index} sx={{ cursor: "pointer" }}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="left">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              alt={data.product.name}
              src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
            />
            <Typography variant="subtitle2" noWrap>
              {data.product.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">Fruit</TableCell>

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
            <Button
              startIcon={<Iconify icon="eva:edit-fill" />}
              variant="outlined"
              color="primary"
            >
              Add
            </Button>
            <IconButton sx={{ color: "error.main" }}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
};
export default TRow;
