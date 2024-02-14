import { TableCellProps } from "@mui/material";

interface ITableHeading {
  id: number;
  name: string;
  isMove: boolean;
  align: TableCellProps["align"];
  isMobile: boolean;
}
export const THeading: ITableHeading[] = [
  {
    id: 1,
    name: "Name",
    isMove: false,
    align: "left",
    isMobile: false,
  },
  {
    id: 2,
    name: "Category",
    isMove: false,
    align: "center",
    isMobile: true,
  },
  {
    id: 4,
    name: "Quantity",
    isMove: false,
    align: "center",
    isMobile: false,
  },
  {
    id: 3,
    name: "Weight",
    isMove: false,
    align: "center",
    isMobile: false,
  },

  {
    id: 5,
    name: "",
    isMove: true,
    align: "right",
    isMobile: false,
  },
];

export const isMobileHeading: ITableHeading[] = [
  {
    id: 1,
    name: "Name",
    isMove: false,
    align: "left",
    isMobile: false,
  },

  {
    id: 4,
    name: "Quantity",
    isMove: false,
    align: "center",
    isMobile: false,
  },
  {
    id: 3,
    name: "Weight",
    isMove: false,
    align: "center",
    isMobile: false,
  },
  {
    id: 5,
    name: "",
    isMove: true,
    align: "right",
    isMobile: false,
  },
];
