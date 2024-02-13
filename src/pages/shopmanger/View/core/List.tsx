import { useEffect, useState } from "react";
import { TPagination } from "../../../../core/Pagination";
import {
  Paper,
  SelectChangeEvent,
  TableBody,
  TablePagination,
} from "@mui/material";
import MTable from "./MTable";
import THead from "./THead";
import { IState } from "../../../../models/IState";
import Tosted from "../../../../core/Tosted";
import { IOrderList } from "../../../../models/IOrderList";
import { PlaceOrderServices } from "../../../../services/PlaceOrder";
import useIsPlaceOrderStore from "../../../../store/isPlaceOrder";
import NoData from "../../../../core/NoData";
import { TLoader } from "../../../../core/Loader";
import THeader from "./THeader";
import TRow from "./TRow";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState<string>("");
  const [category, setCategory] = useState("Fruit");

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const { active, setActive } = useIsPlaceOrderStore((state) => ({
    active: state.active,
    setActive: state.setActive,
  }));

  const [list, setList] = useState<IOrderList[] | undefined>(
    [] as IOrderList[]
  );

  const getOrderList = async () => {
    try {
      setState({ ...state, loader: true });
      const response = await PlaceOrderServices.getAllOrderApi(
        page,
        rowsPerPage
      );
      if (
        response.status === 200 &&
        response.data &&
        response.data.data &&
        response.data.data.products
      ) {
        setList(response.data.data.products);
        setTotalCount("100");
        setState({ ...state, loader: false });
        setActive(false);
      } else {
        setList([]);
        setState({ ...state, loader: false });
      }
    } catch (error: any) {
      // Improved error handling
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setState({
        loader: false,
        tosted: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const categoryHandler = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    if (active) {
      getOrderList();
    }
  }, [active]);

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
    getOrderList();
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
            category={category}
            categoryHandler={categoryHandler}
          />
          <MTable>
            <THead />

            <TableBody>
              {list &&
                list.length > 0 &&
                list.map((data, index) => {
                  return <TRow data={data} index={index} key={index} />;
                })}
            </TableBody>
          </MTable>
          {!loader && list && list.length === 0 && <NoData />}
          {loader && <TLoader />}

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
