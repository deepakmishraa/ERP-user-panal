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

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(["active", "banned"]),
  role: sample([
    "Leader",
    "Hr Manager",
    "UI Designer",
    "UX Designer",
    "UI/UX Designer",
    "Project Manager",
    "Backend Developer",
    "Full Stack Designer",
    "Front End Developer",
    "Full Stack Developer",
  ]),
}));
