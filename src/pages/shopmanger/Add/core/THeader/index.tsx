import { IconButton, SelectChangeEvent, Stack, Tooltip } from "@mui/material";
import { BasicSearch } from "../../../../../core/SearchBar";
import Iconify from "../../../../../core/Iconify";
import CType from "../../../../../core/CType";
import useMobile from "../../../../../hooks/useMobile";
// ----------------------------------------------------------------------
interface IProps {
  searchInputHandler: (value: string) => void;
  searchInput: string;
  category: string;
  categoryHandler: (event: SelectChangeEvent) => void;
}
// ----------------------------------------------------------------------

const THeader = ({
  searchInputHandler,
  searchInput,
  categoryHandler,
  category,
}: IProps) => {
  const isMobile = useMobile();
  return (
    <Stack
      direction={!isMobile ? "row" : "column"}
      alignItems="center"
      justifyContent={"space-between"}
      p={2}
    >
      <Stack
        direction={"row"}
        gap={2}
        width={isMobile ? "100%" : undefined}
        justifyContent={isMobile ? "space-between" : undefined}
      >
        <BasicSearch
          searchInputHandler={searchInputHandler}
          searchInput={searchInput}
          width={"250px"}
        />
        <Tooltip title="Filter With Date">
          <IconButton>
            <Iconify icon="solar:calendar-date-linear" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack
        direction="row"
        gap={2}
        width={isMobile ? "100%" : undefined}
        justifyContent={isMobile ? "space-between" : undefined}
      >
        <Tooltip title="Download Excel">
          <IconButton>
            <Iconify icon="tabler:download" />
          </IconButton>
        </Tooltip>

        <CType uRole={category} handleChange={categoryHandler} />

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
