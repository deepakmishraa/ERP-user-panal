import { useEffect, useState } from "react";
import { TPagination } from "../../../core/Pagination";
import { Paper, TableBody } from "@mui/material";
import THeader from "../../../core/THeader";
import MTable from "./MTable";
import THead from "./THead";
import Loader from "./Loader";
import TRow from "./TRow";
import { UserService } from "../../../services/UserServices";
import { IState } from "../../../models/IState";
import { IUserList } from "../../../models/IUserList";
import Tosted from "../../../core/Tosted";
import useIsUserStore from "../../../store/isUser";

const List = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const { active, setActive } = useIsUserStore((state) => ({
    active: state.active,
    setActive: state.setActive,
  }));

  const [list, setList] = useState<IUserList[] | undefined>(undefined);

  const getUserList = async () => {
    try {
      const response = await UserService.getUserApi();
      if (response.status === 200) {
        setList(response.data.data);
        setState({ ...state, loader: false });
        setActive(false);
      } else {
        setState({
          loader: false,
          tosted: true,
          message: "Something went wrong",
          severity: "error",
        });
        setActive(false);
      }
    } catch (error: any) {
      setState({
        loader: false,
        tosted: true,
        message: error.response.data.message,
        severity: "error",
      });
      setActive(false);
    }
  };

  useEffect(() => {
    if (active) {
      getUserList();
    }
  }, [active]);

  useEffect(() => {
    getUserList();
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
      <Paper sx={{ width: "100%" }} elevation={3}>
        <THeader
          searchInputHandler={searchInputHandler}
          searchInput={searchInput}
        />
        <MTable>
          <THead />

          <TableBody>
            {list?.length === 0
              ? "No Data Found"
              : list?.map((data, index) => {
                  return <TRow data={data} index={index} key={index} />;
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
