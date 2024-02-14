import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { THeading, isMobileHeading } from "../data";
import useMobile from "../../../hooks/useMobile";
// ----------------------------------------------------------------------
const THead = () => {
  const isMobile = useMobile();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        {isMobile
          ? isMobileHeading.map((data, index) => (
              <TableCell
                size={"large" as any}
                key={index}
                align={data.align}
                padding={"normal"}
              >
                {data.name}
              </TableCell>
            ))
          : THeading.map((data, index) => (
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
