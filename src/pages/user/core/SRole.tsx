import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { role } from "../data";
import { FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OtherServie } from "../../../services/OthersServies";
import { IRole } from "../../../models/IRole";

interface IProps {
  uRole: string;
  handleChange: (event: SelectChangeEvent) => void;
  error?: string;
}

export default function SRole({ uRole, handleChange, error }: IProps) {
  const [list, setList] = useState<IRole[] | undefined>(undefined);

  const getAllist = async () => {
    try {
      const response = await OtherServie.getAllRoleApi();
      if (response.status === 200) {
        setList(response.data.data);
      }
    } catch (error: any) {
      console.log("Error of getting an ");
    }
  };

  useEffect(() => {
    getAllist();
  }, []);
  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <InputLabel id="role">Role</InputLabel>
      <Select labelId="role" value={uRole} label="Type" onChange={handleChange}>
        {list?.map((data, index) => {
          return (
            <MenuItem value={data.value} key={index}>
              {data.name}
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
