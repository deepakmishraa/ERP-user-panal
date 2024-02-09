import { Table, TableContainer } from "@mui/material";
import React from "react";
// ----------------------------------------------------------------------
interface IProps {
  children: React.ReactNode;
}
// ----------------------------------------------------------------------
const MTable = ({ children }: IProps) => {
  return (
    <TableContainer>
      <Table size={"medium"} stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};
export default MTable;
