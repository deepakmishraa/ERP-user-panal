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
import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../models/IProduct";
import CircularProgressBar from "./CircularProgressBar";
// ----------------------------------------------------------------------
interface IProps {
  data: IProduct;
  index: number;
}
// ----------------------------------------------------------------------
const TRow = ({ data, index }: IProps) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <>
      <TableRow hover role="checkbox" key={index} sx={{ cursor: "pointer" }}>
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
        <TableCell align="left">
          <b>50 kg / 100 kg</b>
        </TableCell>

        <TableCell align="center">
          <CircularProgressBar value={50} />
        </TableCell>
        <TableCell align="center">
          <Label color={(index / 2 == 0 && "success") || "success"}>
            {"Pending"}
          </Label>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <Link to={`/vessel/1`}>
          <MenuItem sx={{ color: "info.main" }}>
            <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} />
            View
          </MenuItem>
        </Link>
        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};
export default TRow;
