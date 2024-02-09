import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OtherServie } from "../../../services/OthersServies";
import { IRole } from "../../../models/IRole";
import { UserService } from "../../../services/UserServices";
import { IUserList } from "../../../models/IUserList";

interface IProps {
  uRole: string;
  handleChange: (event: SelectChangeEvent) => void;
  error?: string;
}

export default function SRole({ uRole, handleChange, error }: IProps) {
  const [list, setList] = useState<IUserList[] | undefined>(undefined);

  const getUserList = async () => {
    try {
      const response = await UserService.getUserApi();
      if (response.status === 200) {
        setList(response.data.data);
      } else {
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <InputLabel id="Assign-User">Assign User</InputLabel>
      <Select
        labelId="Assign-User"
        value={uRole}
        label="Type"
        onChange={handleChange}
      >
        {list?.map((data, index) => {
          return (
            <MenuItem value={data._id} key={index}>
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
