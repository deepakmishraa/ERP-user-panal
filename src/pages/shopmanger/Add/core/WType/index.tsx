import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText, Typography } from "@mui/material";
import { weightType } from "./data";
// import { useEffect, useState } from "react";
// import { IProduct } from "../../../models/IProduct";

interface IProps {
  uRole: string;
  handleChange: (event: SelectChangeEvent) => void;
  error?: string;
}

export default function WType({ uRole, handleChange, error }: IProps) {
  return (
    <FormControl fullWidth size="small" sx={{ width: "70px" }}>
      <Select value={uRole} onChange={handleChange}>
        {weightType.map((data, index) => {
          return (
            <MenuItem value={data.abbreviation} key={index}>
              {data.abbreviation}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>
        <Typography
          variant="h6"
          fontWeight={600}
          fontSize={"12px"}
          p={0}
          m={0}
          color="error"
        >
          {error}
        </Typography>
      </FormHelperText>
    </FormControl>
  );
}
