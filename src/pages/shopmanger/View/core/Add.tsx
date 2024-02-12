import { Container, Typography, Paper, Box } from "@mui/material";
import ModelOpen from "../../../../core/Model copy";
import { IModel } from "../../../../models/IModel";
import Form from "./Form";

const Add = ({
  open,
  handleClose,
  activeHandler,
  onModelHandler,
  title,
  subTitle,
}: IModel) => {
  return (
    <ModelOpen
      open={open}
      handleClose={handleClose}
      onModelHandler={onModelHandler}
      title={title}
      subTitle={subTitle}
    >
      <Container maxWidth="xs" component={Paper} elevation={2}>
        <Typography variant="h4" textAlign={"start"} gutterBottom>
          {title}
        </Typography>
        <Typography textAlign={"start"} gutterBottom>
          {subTitle}
        </Typography>
        <Box py={2}>
          <Form handleClose={handleClose} />
        </Box>
      </Container>
    </ModelOpen>
  );
};

export default Add;
