export interface IPlaceOrder {
  product: Product;
  quantity: number;
  _id: string;
}
export interface Product {
  _id: string;
  name: string;
  description: string;
}
