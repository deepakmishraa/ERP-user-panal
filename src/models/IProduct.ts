export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  productPicture?: null[] | null;
  category: Category;
}
export interface Category {
  name: string;
}
