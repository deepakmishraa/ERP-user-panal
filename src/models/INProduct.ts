import { IUmoType } from "./IUmoType";

export interface INProduct {
  _id: string;
  UOM: IUmoType;
  name: string;
  slug: string;
  description: string;
  productPicture?: null[] | null;
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
  requirementQuantity: number;
}
export interface Category {
  name: string;
}
