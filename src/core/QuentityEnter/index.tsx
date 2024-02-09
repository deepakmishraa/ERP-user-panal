import {  IconButton, InputBase, Paper } from "@mui/material";
import Iconify from "../Iconify";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface QuentityEnterInterFace {
  quantity: number;
  increaseClickHandler: () => void;
  decreaseClickHandler: () => void;
  InputHandler: (value: string) => void;
}

const QuentityEnter = ({
  quantity,
  increaseClickHandler,
  decreaseClickHandler,
  InputHandler,
}: QuentityEnterInterFace) => {
  const paperCss = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    p: 0,
    m: 0,
  };

  return (
    <Paper component="form" sx={paperCss} elevation={0}>
      <IconButton
        sx={{
          px: "10px",
          borderRight: "1px dashed #ccc",
          background: "#f7f7f7",
          borderRadius: "6px 0px 0px 6px",
        }}
        onClick={decreaseClickHandler}
        disabled={quantity > 0 ? false : true}
      >
        {/* <RemoveIcon
          sx={{ p: 0, m: 0, color: "#000" }}
        /> */}
        <Iconify icon="pajamas:remove-all"/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, p: 0.5 }}
        placeholder=""
        size="medium"
        inputProps={{ min: 0, max: 999 }}
        value={quantity>0?quantity:""}
        type="number"
        onChange={(e: any) => InputHandler(e.target.value)}
      />

      <IconButton
        sx={{
          px: "10px",
          borderRadius: "0px 6px 6px 0px",
          borderLeft: "1px solid #ccc",
          background: "#f7f7f7",
        }}
        aria-label="directions"
        onClick={increaseClickHandler}
      >
        {/* <AddOutlinedIcon
          sx={{ p: 0, m: 0, color: "#000" }}  
        /> */}
        <Iconify icon="mingcute:add-fill"/>
      </IconButton>
    </Paper>
  );
};
export default QuentityEnter;
