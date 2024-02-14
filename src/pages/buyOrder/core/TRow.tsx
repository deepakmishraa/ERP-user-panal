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
  Button,
} from "@mui/material";
import { Label } from "../../../core/Label";
import Iconify from "../../../core/Iconify";
import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import Update from "./Update";
import { IOrderList } from "../../../models/IOrderList";
import useMobile from "../../../hooks/useMobile";
import CircularLoader from "../../../core/CircularLoader";
import { IState } from "../../../models/IState";
// ----------------------------------------------------------------------
interface IProps {
  data: IOrderList;
  index: number;
}
// ----------------------------------------------------------------------
const TRow = ({ data, index }: IProps) => {
  const isMobile = useMobile();
  const [product, setProduct] = useState<IOrderList>(data);
  const [quantity, setQuantity] = useState(data.quantity);
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [active, setActive] = useState(false);
  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [oModel, setOModel] = useState(false);

  const onModelHandler = () => {
    setOModel(!oModel);
  };
  const hCloseModel = () => {
    setOModel(false);
  };
  const activeHandler = (data: boolean) => {
    setTimeout(() => {
      setActive(data);
    }, 1000);
  };

  return (
    <>
      <TableRow hover role="checkbox" key={index} sx={{ cursor: "pointer" }}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {isMobile ? (
            data.productName
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt={data.productName}
                src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
              />
              <Typography variant="subtitle2" noWrap>
                {data.productName}
              </Typography>
            </Stack>
          )}
        </TableCell>
        <TableCell align="left">
          <b>50 kg / {data.quantity} kg</b>
        </TableCell>
        {!isMobile && (
          <TableCell align="center">
            <CircularProgressBar value={50} />
          </TableCell>
        )}

        <TableCell align="right">
          <Stack direction={"row"} gap={"5px"} justifyContent={"end"}>
            {product.quantity > 0 && (
              <Stack direction={"row"} gap={"4px"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  sx={{ height: "40px" }}
                  // disabled={data.quantity == quantity ? true : false}
                  onClick={onModelHandler}
                >
                  {!state.loader ? `Update` : <CircularLoader />}
                </Button>

                <IconButton
                  sx={{ color: "error.main" }}
                  onClick={() => alert("sd")}
                >
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </TableCell>
      </TableRow>

      <Update
        open={oModel}
        handleClose={hCloseModel}
        activeHandler={activeHandler}
        onModelHandler={onModelHandler}
        title="Update An Order"
        subTitle="Please fill the fields "
        data={data}
      />
    </>
  );
};
export default TRow;
