import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText, Typography } from "@mui/material";
import { list } from "./data";

interface IProps {
  uRole: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export default function CType({ uRole, handleChange }: IProps) {
  return (
    <FormControl fullWidth size="small" sx={{ width: "120px" }}>
      <Select value={uRole} onChange={handleChange}>
        {list.map((data, index) => {
          return (
            <MenuItem value={data.name} key={index}>
              {data.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
