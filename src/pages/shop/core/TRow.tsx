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
import { IShopList } from "../../../models/IShopList";
// ----------------------------------------------------------------------
interface IProps {
  data: IShopList;
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
        <TableCell align="center">{data.area}</TableCell>

        <TableCell align="center">{data.city}</TableCell>
        <TableCell align="center">
          <Label color={"success"}>{data.shopManager.name}</Label>
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
        <Link to={`/shop/${data._id}`}>
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
