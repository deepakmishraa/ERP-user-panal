import { useEffect, useState } from "react";
import { List, Add } from "./core";
import { Paper } from "@mui/material";
import { IState } from "../../models/IState";
import { ShopService } from "../../services/ShopServies";
import { useParams } from "react-router-dom";
import { IShopList } from "../../models/IShopList";
import { MainHead } from "../../core/bodyHead";

function ViewShop() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [list, setList] = useState<IShopList | undefined>(undefined);
  let { id } = useParams();
  const onModelHandler = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const activeHandler = (data: boolean) => {
    setTimeout(() => {
      setActive(data);
    }, 1000);
  };

  const [state, setState] = useState<IState>({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const getUserList = async () => {
    try {
      const response = await ShopService.getShopDetailApi(id);
      if (response.status === 200) {
        // setList(response.data.data);
        console.log("Response is ", response.data.data);
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
    getUserList();
  }, []);

  return (
    <>
      <MainHead
        title="Shop Detail"
        iconTitle="New User"
        onClickHandler={onModelHandler}
      />

      <Paper elevation={3} sx={{ height: "150px", mb: 3 }}>
        <pre>{JSON.stringify(list)}</pre>
      </Paper>

      <List />
      <Add
        open={open}
        activeHandler={activeHandler}
        handleClose={handleClose}
        onModelHandler={onModelHandler}
        title="Assign User"
        subTitle="Assign An New  User "
      />
    </>
  );
}

export default ViewShop;
