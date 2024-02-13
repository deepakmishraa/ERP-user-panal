import { useEffect, useState } from "react";
import { TPagination } from "../../../core/Pagination";
import { Paper, TableBody, TablePagination } from "@mui/material";
import THeader from "../../../core/THeader";
import MTable from "./MTable";
import THead from "./THead";
import TRow from "./TRow";
import { IState } from "../../../models/IState";
import Tosted from "../../../core/Tosted";

import { PlaceOrderServices } from "../../../services/PlaceOrder";
import { IOrderList } from "../../../models/IOrderList";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState<string>("");

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const [list, setList] = useState<IOrderList[] | undefined>(undefined);

  const getAllProductList = async () => {
    try {
      const response = await PlaceOrderServices.getAllOrderApi();
      if (
        response.status === 200 &&
        response.data &&
        response.data.token &&
        response.data.token.products
      ) {
        setTotalCount(response.data.token.totalItems);
        setPage(response.data.token.currentPage);
        setList(response.data.token.products);
        setState({ ...state, loader: false });
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

  useEffect(() => {
    getAllProductList();
  }, []);

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

  useEffect(() => {
    getAllProductList();
  }, [rowsPerPage, page]);

  const getRowsPerPageOptions = () => {
    if (+totalCount <= 10) {
      return []; // returns an empty array if totalCount is 10 or less
    }
    return [10, 25, 50];
  };

  const { loader, message, severity, tosted } = state;
  const handleClose = () => {
    if (state.tosted) {
      setTimeout(() => {
        setState({
          ...state,
          tosted: false,
          message: "",
        });
      }, 5000);
    }
  };

  useEffect(() => {
    handleClose();
  }, [tosted]);

  return (
    <>
      <div>
        <Paper sx={{ width: "100%" }} elevation={3}>
          <THeader
            searchInputHandler={searchInputHandler}
            searchInput={searchInput}
          />
          <MTable>
            <THead />

            <TableBody>
              {list?.map((data, index) => {
                return <TRow data={data} index={index} key={index} />;
              })}
            </TableBody>
          </MTable>

          <TablePagination
            component="div"
            count={+totalCount}
            page={+page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={+rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={getRowsPerPageOptions()}
          />
        </Paper>
      </div>

      <Tosted
        label={message}
        open={tosted}
        severity={severity}
        handleClose={handleClose}
      />
    </>
  );
};
export default List;
