import { useEffect, useState } from "react";
import { TPagination } from "../../../core/Pagination";
import { Paper, SelectChangeEvent, TableBody } from "@mui/material";
// import THeader from "../../../core/THeader";
import MTable from "./MTable";
import THead from "./THead";
import TRow from "./TRow";
import { IState } from "../../../models/IState";
import Tosted from "../../../core/Tosted";
import { IPlaceOrder } from "../../../models/IPlaceOrder";
import { PlaceOrderServices } from "../../../services/PlaceOrder";
import useIsPlaceOrderStore from "../../../store/isPlaceOrder";
import NoData from "../../../core/NoData";
import { TLoader } from "../../../core/Loader";
import THeader from "./THeader";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
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

  const [list, setList] = useState<IPlaceOrder[] | undefined>(
    [] as IPlaceOrder[]
  );

  const getAllProductList = async () => {
    try {
      setState({ ...state, loader: true }); // Set loader to true when the operation starts
      const response = await PlaceOrderServices.getAllOrderApi();
      if (
        response.status === 200 &&
        response.data &&
        response.data.data &&
        response.data.data.items
      ) {
        setList(response.data.data.items);
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
    getAllProductList();
  }, []);

  useEffect(() => {
    if (active) {
      getAllProductList();
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
            <TPagination
              count={24}
              rowsPerPage={10}
              page={0}
              ChangePage={handleChangePage}
              ChangeRowsPerPage={handleChangeRowsPerPage}
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
