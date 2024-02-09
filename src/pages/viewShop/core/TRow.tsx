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
} from "@mui/material";
import { Label } from "../../../core/Label";
import Iconify from "../../../core/Iconify";
import { faker } from "@faker-js/faker";
import { useState, MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { IUserList } from "../../../models/IUserList";
import { ShopService } from "../../../services/ShopServies";
import { useParams } from "react-router-dom";
import { IState } from "../../../models/IState";
import Tosted from "../../../core/Tosted";
import useIsShopStore from "../../../store/isShop";
// ----------------------------------------------------------------------
interface IProps {
  data: IUserList;
  index: number;
}
// ----------------------------------------------------------------------
const TRow = ({ data, index }: IProps) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  let { id } = useParams();
  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const { active, setActive } = useIsShopStore((state) => ({
    active: state.active,
    setActive: state.setActive,
  }));

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const removeAssignUserApi = async () => {
    try {
      const response = await ShopService.removeAssignUserApi(data._id, id);
      if (response.status === 200) {
        // setList(response.data.data);
        console.log("Response is ", response.data.data);
        setActive(true);
        setState({
          loader: false,
          tosted: true,
          message: response.data.message,
          severity: "success",
        });
      } else {
        setState({
          loader: false,
          tosted: true,
          message: "Something went wrong",
          severity: "error",
        });
      }
    } catch (error: any) {
      setState({
        loader: false,
        tosted: true,
        message: error.response.data.message,
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

  useEffect(() => {
    handleClose();
  }, [state.tosted]);

  const { loader, tosted, message, severity } = state;

  return (
    <>
      <TableRow hover role="checkbox" key={index} sx={{ cursor: "pointer" }} >
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={data.name}
              src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
            />
            <Typography variant="subtitle2" noWrap>
              {data.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">{data.email}</TableCell>

        <TableCell align="center">{data.mobileNo}</TableCell>
        <TableCell align="center">
          <Label color={"success"}>{data.userType}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem sx={{ color: "error.main" }} onClick={removeAssignUserApi}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
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
