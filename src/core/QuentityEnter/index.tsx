import { Box, IconButton, InputBase, Paper, Stack } from "@mui/material";
import Iconify from "../Iconify";
import CenterBox from "../CenterBox";

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
  return (
    <CenterBox height="100%">
      <Stack
        direction={"row"}
        gap={"5px"}
        width={"150px"}
        justifyContent={"center"}
      >
        <IconButton
          onClick={decreaseClickHandler}
          color="error"
          disabled={quantity > 0 ? false : true}
        >
          <Iconify icon="streamline:subtract-1-solid" />
        </IconButton>
        <InputBase
          sx={{
            flex: 1,
            border: (theme) => `1px dashed ${theme.palette.divider}`,
            borderRadius: "10px",
            width: "50px",
            "& .MuiInputBase": {
              textAlign: "center",
            },
            "& .MuiInputBase-input": {
              textAlign: "center",
              fontSize: "14px",
              color: "#000",
              fontWeight: "500",
            },
          }}
          placeholder=""
          size="medium"
          inputProps={{ min: 0, max: 999 }}
          value={quantity > 0 ? quantity : ""}
          type="number"
          onChange={(e: any) => InputHandler(e.target.value)}
        />
        <IconButton
          aria-label="directions"
          color="primary"
          onClick={increaseClickHandler}
        >
          <Iconify icon="mingcute:add-fill" />
        </IconButton>
      </Stack>
    </CenterBox>
  );
};
export default QuentityEnter;
