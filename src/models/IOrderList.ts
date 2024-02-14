import { IUmoType } from "./IUmoType";

export interface IOrderList {
  _id: string;
  productId: string;
  productName: string;
  quantity: number;
  UOM: IUmoType;
  category: Category;
  description: string;
}
export interface Category {
  id: string;
  name: string;
}
