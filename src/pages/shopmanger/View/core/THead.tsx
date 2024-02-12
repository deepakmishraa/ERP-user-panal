import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { THeading } from "../data";
// ----------------------------------------------------------------------
const THead = () => {
  return (
    <TableHead>
      <TableRow>
        {THeading.map((data, index) => (
          <TableCell
            size={"large" as any}
            key={index}
            align={data.align}
            padding={"normal"}
          >
            {data.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default THead;
