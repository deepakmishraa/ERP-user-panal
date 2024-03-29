import { useEffect, useState } from "react";
import { TPagination } from "../../../core/Pagination";
import {
  Paper,
  SelectChangeEvent,
  TableBody,
  TablePagination,
} from "@mui/material";
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
  const [category, setCategory] = useState("");

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const [list, setList] = useState<IOrderList[] | undefined>(undefined);

  const getAllProductList = async () => {
    try {
      const response = await PlaceOrderServices.getAllOrderApi(
        page,
        rowsPerPage,
        category,
        searchInput
      );
      if (
        response.status === 200 &&
        response.data &&
        response.data.data.products
      ) {
        setTotalCount(response.data.data.totalItems);
        setPage(response.data.data.currentPage);
        setList(response.data.data.products);
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
  const categoryHandler = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const searchInputHandler = (value: string) => {
    setSearchInput(value);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1); // Add 1 to newPage to make it 1-based index
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    getAllProductList();
  }, [rowsPerPage, page, category]);

  useEffect(() => {
    // Debounce implementation
    const handler = setTimeout(() => {
      getAllProductList();
    }, 500); // 2-second delay

    return () => clearTimeout(handler); // Clear timeout on component unmount or if searchInput changes again within the delay
  }, [searchInput]);

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
            category={category}
            categoryHandler={categoryHandler}
          />
          <MTable>
            <THead />

            <TableBody>
              {list?.map((data, index) => {
                return <TRow data={data} index={index} key={index} />;
              })}
            </TableBody>
          </MTable>

          {list && list.length > 0 && (
            <TablePagination
              component="div"
              count={+totalCount}
              page={+page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={+rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={getRowsPerPageOptions()}
            />
          )}
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
