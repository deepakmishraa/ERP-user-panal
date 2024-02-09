import { useState } from "react";
import { MainHead } from "../../core/bodyHead";
import { List, Add } from "./core";

function User() {
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
      <div>
        <MainHead
          title="User"
          iconTitle="New User"
          onClickHandler={onModelHandler}
        />
        <List />
      </div>
      <Add
        open={open}
        activeHandler={activeHandler}
        handleClose={handleClose}
        onModelHandler={onModelHandler}
        title="Add User"
        subTitle="Create An New User "
      />
    </>
  );
}

export default User;
