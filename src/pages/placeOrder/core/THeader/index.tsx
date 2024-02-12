import { IconButton, SelectChangeEvent, Stack, Tooltip } from "@mui/material";
import { BasicSearch } from "../../../../core/SearchBar";
import Iconify from "../../../../core/Iconify";
import CType from "../CType";
import { useState } from "react";
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
