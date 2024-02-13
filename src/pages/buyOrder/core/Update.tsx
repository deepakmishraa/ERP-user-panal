import { Container, Typography, Paper, Box } from "@mui/material";
import ModelOpen from "../../../core/Model copy";
import { UpdateForm } from "./Form";
import { IBuyProduct } from "../../../models/IBuyProduct";
import { IOrderList } from "../../../models/IOrderList";

interface IModel {
  open: boolean;
  activeHandler(data: boolean): void;
  onModelHandler(): void;
  handleClose: () => void;
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  data: IOrderList;
}

const Update = ({
  open,
  handleClose,
  activeHandler,
  onModelHandler,
  title,
  subTitle,
  data,
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
          <UpdateForm handleClose={handleClose} data={data} />
        </Box>
      </Container>
    </ModelOpen>
  );
};

export default Update;
