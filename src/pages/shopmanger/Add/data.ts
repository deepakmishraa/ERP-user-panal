import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import { TableCellProps } from "@mui/material";

interface ITableHeading {
  id: number;
  name: string;
  isMove: boolean;
  align: TableCellProps["align"];
}
export const THeading: ITableHeading[] = [
  { id: 0, name: "ID", isMove: false, align: "center" },
  {
    id: 1,
    name: "Name",
    isMove: false,
    align: "left",
  },
  {
    id: 2,
    name: "Category",
    isMove: false,
    align: "center",
  },
  {
    id: 4,
    name: "Quantity",
    isMove: false,
    align: "center",
  },
  {
    id: 3,
    name: "Weight",
    isMove: false,
    align: "center",
  },

  {
    id: 5,
    name: "",
    isMove: true,
    align: "right",
  },
];
