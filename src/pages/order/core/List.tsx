import { useState } from "react";
import { TPagination } from "../../../core/Pagination";
import { Paper, TableBody } from "@mui/material";
import THeader from "../../../core/THeader";
import MTable from "./MTable";
import THead from "./THead";
import Loader from "./Loader";
import TRow from "./TRow";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState<string>("");

  const searchInputHandler = (value: string) => {
    setSearchInput(value);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Paper sx={{ width: "100%" }} elevation={3}>
        <THeader
          searchInputHandler={searchInputHandler}
          searchInput={searchInput}
        />
        <MTable>
          <THead />

          <TableBody>
            {[1, 2, 3, 4, 5].map((data, index) => {
              return <TRow data={data.toString()} index={index} key={index} />;
            })}
          </TableBody>
        </MTable>
        <TPagination
          count={24}
          rowsPerPage={10}
          page={0}
          ChangePage={handleChangePage}
          ChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default List;
