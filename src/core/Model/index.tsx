import {
  Fade,
  Modal,
  Box,
  Typography,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import React, { Fragment } from "react";
import { style, subtitle, titleCss } from "./styles";
import Iconify from "../Iconify";

interface ModelOpenInterFace {
  open: boolean;
  onModelHandler(): void;
  handleClose: () => void;
  children?: React.ReactNode;
  width?: string;
  title?: string;
  subTitle?: string;
  height?: string;
}

const ModelOpen = ({
  open,
  handleClose,
  onModelHandler,
  children,
  width,
  title,
  subTitle,
  height,
}: ModelOpenInterFace) => {
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
          {/* <Box style={style} width={width ? width : 350} height={height?height:"auto"} sx={{overflowY:"auto"}}>
            <Box sx={titleCss}>
              <Typography
                variant="subtitle1"
                color="#000"
                textAlign={"start"}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                {title ? title : ""}
              </Typography>
            </Box>
            <Box>
              <Box sx={subtitle}>
                <Typography
                  variant="subtitle2"
                  color="#000"
                  fontWeight={"500"}
                  fontSize={"13px"}
                  gutterBottom
                >
                  {subTitle ? subTitle : ""}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                {children}
              </Box>
            </Box>
          </Box> */}
          <Box
            style={style}
            width={width ? width : 350}
            height={height ? height : "auto"}
            sx={{ position: "relative" }}
          >
            <Paper elevation={2}>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                {title ? title : ""}
              </Typography>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="#000"
                  fontWeight={"500"}
                  fontSize={"13px"}
                  gutterBottom
                >
                  {subTitle ? subTitle : ""}
                </Typography>
                <Box pt={1}>{children}</Box>
              </Box>
            </Paper>
            <Box
              sx={{
                position: "absolute",
                height: "30px",
                width: "30px",
                top: -30,
                right: -30,
              }}
              color={"primary"}
            >
              <IconButton color="primary" onClick={handleClose}>
                <Iconify
                  icon="eva:close-outline"
                  sx={{ width: "30px", height: "30px" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default ModelOpen;
