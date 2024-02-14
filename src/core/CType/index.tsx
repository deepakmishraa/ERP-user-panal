import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ICategoryList } from "../../models/ICategoryList";
import { useEffect, useState } from "react";
import { CategoryService } from "../../services/CategoryServices";
interface IProps {
  uRole: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export default function CType({ uRole, handleChange }: IProps) {
  const [list, setList] = useState<ICategoryList[] | undefined>(
    [] as ICategoryList[]
  );
  const [loader, setLoader] = useState(false);

  const getAllProductList = async () => {
    try {
      setLoader(true);
      const response = await CategoryService.getAllCategoryApi();
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
    <FormControl fullWidth size="small" sx={{ width: "120px" }}>
      <Select value={uRole} onChange={handleChange} displayEmpty>
        <MenuItem value="">All</MenuItem>
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
    </FormControl>
  );
}
