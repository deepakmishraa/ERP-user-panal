import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import Iconify from "../Iconify";

interface IProps {
  width: string | number;
  searchInput: string;
  searchInputHandler: (value: string) => void;
}

export default function BasicSearch({
  width,
  searchInputHandler,
  searchInput,
}: IProps) {
  return (
    <Paper
      component="form"
      sx={{
        width: width,
        my: 1,
        borderRadius: "12px",
        border: "1px solid #ccc",
        display: "flex",
        height: "40px",
        alignItems: "center",
        justifyContent: "center",
      }}
      elevation={0}
      className="center"
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: 0.5 }}
        placeholder="Search"
        size="medium"
        inputProps={{ "aria-label": "Search Category" }}
        onChange={(e) => {
          searchInputHandler(e.target.value);
        }}
        value={searchInput}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <IconButton sx={{ p: "10px" }} aria-label="search">
        {/* <SearchIcon sx={{ color: "#ff9900" }} /> */}
        <Iconify icon="ic:twotone-search" />
      </IconButton>
    </Paper>
  );
}
