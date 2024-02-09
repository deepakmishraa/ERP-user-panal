import { Container, Typography, Paper } from "@mui/material";
// import AddPortForm from "../Helper";
import ModelOpen from "../../../core/Model copy";
import { IModel } from "../../../models/IModel";

const AddPort = ({
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
          Add Port
        </Typography>
        {/* <AddPortForm /> */}
      </Container>
    </ModelOpen>
  );
};

export default AddPort;
