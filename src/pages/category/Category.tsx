import { useState } from "react";
import { MainHead } from "../../core/bodyHead";
import { List, Add } from "./core";

function Product() {
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
        title="Category"
        iconTitle="New Category"
        onClickHandler={onModelHandler}
      />
      <List />
      <Add
        open={open}
        activeHandler={activeHandler}
        handleClose={handleClose}
        onModelHandler={onModelHandler}
        title="Add Product"
        subTitle="Create An Product "
      />
    </>
  );
}

export default Product;
