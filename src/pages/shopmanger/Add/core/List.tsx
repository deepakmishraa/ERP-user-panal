import { useEffect, useState } from "react";
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
import TRow from "./TRow";
import { IState } from "../../../../models/IState";
import Tosted from "../../../../core/Tosted";
import { PlaceOrderServices } from "../../../../services/PlaceOrder";
import useIsPlaceOrderStore from "../../../../store/isPlaceOrder";
import NoData from "../../../../core/NoData";
import { TLoader } from "../../../../core/Loader";
import THeader from "./THeader";
import { INProduct } from "../../../../models/INProduct";
import Iconify from "../../../../core/Iconify";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

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

  const [list, setList] = useState<INProduct[] | undefined>([] as INProduct[]);

  const getAllProductList = async () => {
    try {
      setState({ ...state, loader: true }); // Set loader to true when the operation starts
      setList([]);
      const response = await PlaceOrderServices.getAllProductApi(
        page,
        rowsPerPage,
        category
      );
      if (response.status === 200 && response.data && response.data.data) {
        setList(response.data.data.products);
        setTotalCount(response.data.data.totalProducts);
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

  const deleteItemHandler = async () => {
    try {
      setState({ ...state, loader: true }); // Set loader to true when the operation starts
      setList([]);
      const response = await PlaceOrderServices.deleteRequirementItem(selected);
      if (response.status === 200) {
        alert("Delete");
        getAllProductList();
      } else {
        // setList([]);
        // setState({ ...state, loader: false });
        alert("Some thing went wrong");
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
        const newSelecteds = list?.map((n) => n._id);
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
    getAllProductList();
  }, [rowsPerPage, page, category]);

  const getRowsPerPageOptions = () => {
    if (+totalCount <= 10) {
      return []; // returns an empty array if totalCount is 10 or less
    }
    return [10, 25, 50];
  };

  useEffect(() => {
    if (active) {
      getAllProductList();
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
          {selected.length > 0 ? (
            <Stack
              px={4}
              py={2.5}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}

              // sx={{ background: (theme) => theme.palette.primary.light }}
            >
              <Typography variant="h3" color={"primary.main"}>
                {selected.length + 1} Select
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
              />
            </>
          )}
          <MTable>
            <THead handleSelectAllClick={handleSelectAllClick} />

            <TableBody>
              {list &&
                list.length > 0 &&
                list.map((data, index) => {
                  const isItemSelected = selected.indexOf(data._id) !== -1;
                  return (
                    <TRow
                      data={data}
                      index={index}
                      key={data._id} // Assuming _id is unique
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
    </>
  );
};
export default List;
