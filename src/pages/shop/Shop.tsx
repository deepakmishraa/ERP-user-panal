import { useState } from "react";
import { MainHead } from "../../core/bodyHead";
import { List, Add } from "./core";

function Shop() {
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
      <MainHead
        title="Shop"
        iconTitle="New Shop"
        onClickHandler={onModelHandler}
      />
      <List />
      <Add
        open={open}
        activeHandler={activeHandler}
        handleClose={handleClose}
        onModelHandler={onModelHandler}
        title="Add Shop"
        subTitle="Create An New Shop "
      />
    </>
  );
}

export default Shop;
