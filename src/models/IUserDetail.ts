export interface IUserDetail {
  status: number;
  message: string;
  time: string;
  token: string;
  data: UserData;
}
export type RoleType =
  | "purchaseManager"
  | "procurementManager"
  | "allocationManager"
  | "shopManager";

export interface UserData {
  _id: string;
  name: string;
  email?: string;
  role: RoleType;
}
