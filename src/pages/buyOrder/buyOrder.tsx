import { useState } from "react";
import { MainHead } from "../../core/bodyHead";
import { List, Add } from "./core";
import { Stack } from "@mui/material";
import H1 from "../../core/H1";

function PlaceOrder() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

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

  return (
    <>
      {/* <MainHead
        title="Buy Order"
        iconTitle="New Order"
        onClickHandler={onModelHandler}
      /> */}

      <Stack mb={5}>
        <H1 title="Buy Order" />
      </Stack>

      <List />
      <Add
        open={open}
        activeHandler={activeHandler}
        handleClose={handleClose}
        onModelHandler={onModelHandler}
        title="Add New Order"
        subTitle="Place An New Order"
      />
    </>
  );
}

export default PlaceOrder;
