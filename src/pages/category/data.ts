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
  {
    id: 1,
    name: "Name",
    isMove: false,
    align: "left",
  },
  {
    id: 2,
    name: "Description",
    isMove: false,
    align: "left",
  },

  {
    id: 3,
    name: "Total Product",
    isMove: false,
    align: "right",
  },
  {
    id: 4,
    name: "",
    isMove: true,
    align: "right",
  },
];

export interface IList {
  id: number;
  name: string;
  icon: string;
  item: number;
}

export const list: IList[] = [
  {
    id: 1,
    name: "Fruit",
    icon: "healthicons:fruits",
    item: 100,
  },
  {
    id: 2,
    name: "Vegetable",
    icon: "icon-park:vegetables",
    item: 200,
  },
];
