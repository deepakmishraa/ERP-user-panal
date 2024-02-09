import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { THeading } from "../data";
// ----------------------------------------------------------------------
const THead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        {THeading.map((data, index) => (
          <TableCell key={index} align={data.align} padding={"normal"}>
            {data.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default THead;
