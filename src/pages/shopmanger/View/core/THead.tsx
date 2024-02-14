import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { THeading, isMobileHeading } from "../data";
import useMobile from "../../../../hooks/useMobile";
// ----------------------------------------------------------------------
interface IProps {
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const THead = ({ handleSelectAllClick }: IProps) => {
  const isMobile = useMobile();
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" padding="checkbox">
          <Checkbox onChange={handleSelectAllClick} />
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
