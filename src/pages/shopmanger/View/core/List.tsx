import { useEffect, useState } from "react";
import { TPagination } from "../../../../core/Pagination";
import {
  IconButton,
  Paper,
  SelectChangeEvent,
  Stack,
  TableBody,
  TablePagination,
  Typography,
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
import Iconify from "../../../../core/Iconify";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [category, setCategory] = useState("");

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const [state1, setState1] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const [date, setDate] = useState<string>("");

  // Event handler for date change
  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    console.log("Date Handler", event.target.value);
  };

  const { active, setActive } = useIsPlaceOrderStore((state) => ({
    active: state.active,
    setActive: state.setActive,
  }));

  const [list, setList] = useState<IOrderList[] | undefined>(
    [] as IOrderList[]
  );

  const getOrderList = async () => {
    setList([]);
    try {
      setState({ ...state, loader: true });
      const response = await PlaceOrderServices.getAllOrderApi(
        page,
        rowsPerPage,
        category,
        searchInput,
        date
      );
      if (
        response.status === 200 &&
        response.data &&
        response.data.data &&
        response.data.data.products
      ) {
        setList(response.data.data.products);
        setTotalCount(response.data.data.totalItems);
        setState({ ...state, loader: false });
        setActive(false);
      } else {
        setList([]);
        setState({ ...state, loader: false });
      }
    } catch (error: any) {
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

  const deleteItemHandler = async () => {
    try {
      setState1({ ...state, loader: true }); // Set loader to true when the operation starts
      console.log("Line No 89", selected);
      const response = await PlaceOrderServices.deleteRequirementItem(selected);
      if (response.status === 200) {
        setState1({
          loader: false,
          tosted: true,
          message: response.data.message,
          severity: "success",
        });
        setSelected([]);
        getOrderList();
      } else {
        setState({
          loader: false,
          tosted: true,
          message: response.data.message,
          severity: "success",
        });
        setSelected([]);
      }
    } catch (error: any) {
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

  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    // Logic to add or remove from selection
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex >= 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (list && list.length > 0) {
        const newSelecteds = list?.map((n) => n.productId);
        setSelected(newSelecteds);
        return;
      } else {
        setSelected([]);
      }
    }
  };

  const categoryHandler = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    if (active) {
      getOrderList();
    }
  }, [active]);

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
    getOrderList();
  }, [rowsPerPage, page, category, date]);

  useEffect(() => {
    // Debounce implementation
    const handler = setTimeout(() => {
      getOrderList();
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

  const handleClose1 = () => {
    if (state1.tosted) {
      setTimeout(() => {
        setState1({
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

  useEffect(() => {
    handleClose1();
  }, [state1.tosted]);

  return (
    <>
      <div>
        <Paper sx={{ width: "100%" }} elevation={3}>
          {selected.length > 0 ? (
            <Stack
              px={4}
              py={2.5}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h3" color={"primary.main"}>
                {selected.length} Select
              </Typography>
              <IconButton color="primary" onClick={deleteItemHandler}>
                <Iconify icon="mingcute:delete-2-line" />
              </IconButton>
            </Stack>
          ) : (
            <>
              <THeader
                searchInputHandler={searchInputHandler}
                searchInput={searchInput}
                category={category}
                categoryHandler={categoryHandler}
                date={date}
                onDateChange={onDateChange}
              />
            </>
          )}

          <MTable>
            <THead handleSelectAllClick={handleSelectAllClick} />

            <TableBody>
              {list &&
                list.length > 0 &&
                list.map((data, index) => {
                  const isItemSelected =
                    selected.indexOf(data.productId) !== -1;
                  return (
                    <TRow
                      data={data}
                      index={index}
                      key={data.productId} // Assuming _id is unique
                      isSelected={isItemSelected}
                      handleSelect={handleSelect}
                    />
                  );
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

      <Tosted
        label={state1.message}
        open={state1.tosted}
        severity={state1.severity}
        handleClose={handleClose1}
      />
    </>
  );
};
export default List;
