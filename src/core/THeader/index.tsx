import { IconButton, Stack, Tooltip } from "@mui/material";
import { BasicSearch } from "../SearchBar";
import Iconify from "../Iconify";
// ----------------------------------------------------------------------
interface IProps {
  searchInputHandler: (value: string) => void;
  searchInput: string;
}
// ----------------------------------------------------------------------

const THeader = ({ searchInputHandler, searchInput }: IProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <BasicSearch
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        width={"250px"}
      />
      <Stack direction="row" gap={2}>
        <Tooltip title="Download Excel">
          <IconButton>
            <Iconify icon="tabler:download" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="fluent:filter-12-filled" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
export default THeader;
