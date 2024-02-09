import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { IProduct } from "../../../models/IProduct";
import { ProductServices } from "../../../services/ProductServices";

interface IProps {
  uRole: string;
  handleChange: (event: SelectChangeEvent) => void;
  error?: string;
}

export default function SRole({ uRole, handleChange, error }: IProps) {
  const [list, setList] = useState<IProduct[] | undefined>(undefined);
  const [loader, setLoader] = useState(false);

  const getAllProductList = async () => {
    try {
      setLoader(true);
      const response = await ProductServices.getAllProductApi();
      if (response.status === 200) {
        setList(response.data.data);
        setLoader(false);
      }
    } catch (error: any) {
      console.log("Error", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllProductList();
  }, []);
  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <InputLabel id="name">Product</InputLabel>

      <Select
        labelId="name"
        id="name"
        value={uRole}
        label="Type"
        onChange={handleChange}
      >
        {loader ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          list?.map((data, index) => (
            <MenuItem value={data._id} key={index}>
              {data.name}
            </MenuItem>
          ))
        )}
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
