export interface IBuyProduct {
  product: Product;
  totalQuantity: number;
  remarks: string;
}
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  productPicture?: null[] | null;
  category: string;
}
