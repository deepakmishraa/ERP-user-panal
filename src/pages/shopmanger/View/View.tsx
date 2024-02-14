import { useState } from "react";
import { List, Add } from "./core";
import H1 from "../../../core/H1";
import { Stack } from "@mui/material";

function View() {
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <H1 title="All Order List" />
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

export default View;
