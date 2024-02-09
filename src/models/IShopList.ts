export interface IShopList {
  _id: string;
  name: string;
  area: string;
  city: string;
  shopManager: ShopManager;
}
export interface ShopManager {
  _id: string;
  name: string;
  mobileNo: string;
  email: string;
}
