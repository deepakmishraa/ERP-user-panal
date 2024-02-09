import {
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  Skeleton,
  IconButton,
} from "@mui/material";
// import { Label } from "../../Label";
// import { Label } from "../../../../core/Label";
import { Label } from "../../../core/Label";

import Iconify from "../../../core/Iconify";
import CenterBox from "../../../core/CenterBox";
// ----------------------------------------------------------------------

const Loader = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((data, index) => {
        return (
          <TableRow
            hover
            role="checkbox"
            key={index}
            sx={{ cursor: "pointer" }}
          >
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "130px" }}
                />
              </Stack>
            </TableCell>
            <TableCell align="left">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100px" }}
              />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
            <TableCell align="center">
              {/* {row.isVerified ? "Yes" : "No"} */}
              <CenterBox height="100%">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "50px" }}
                />
              </CenterBox>
            </TableCell>
            <TableCell align="center">
              <Label color={("banned" === "banned" && "error") || "success"}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "50px" }}
                />
              </Label>
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
export default Loader;
