import { Fade, Modal, Box } from "@mui/material";
import React, { Fragment } from "react";

interface ModelOpenInterFace {
  open: boolean;
  onModelHandler(): void;
  handleClose: () => void;
  children?: React.ReactNode;
  width?: string;
  title?:string,
  subTitle?:string
}

const ModelOpen = ({
  open,
  handleClose,
  onModelHandler,
  children,
  width,
}: ModelOpenInterFace) => {
  const style = {
    position: "absolute" as "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width ? width : 400,
    height: "80%",
    bgcolor: "#fff",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "8px",
    zIndex: "99999",
    overflow: "auto",
  };

  return (
    <Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box style={style}>{children}</Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default ModelOpen;
