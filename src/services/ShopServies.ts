import { InstanceAxios } from "../hooks/axiosConfig";

export class ShopService {
  public static getShopApi() {
    return InstanceAxios().get("/shop/get");
  }
  public static getUserOnShopApi(id: string | undefined) {
    return InstanceAxios().get(`/shop/shopUsers/${id}`);
  }
  public static assignUserApi(
    userId: string | undefined,
    shopId: string | undefined
  ) {
    const data = {
      userId: userId,
      shopId: shopId,
    };
    return InstanceAxios().post(`/shop/assignUser`, data);
  }

  public static removeAssignUserApi(
    userId: string | undefined,
    shopId: string | undefined
  ) {
    const data = {
      userId: userId,
      shopId: shopId,
    };
    return InstanceAxios().delete(`/shop/removeAssignment`, {
      data: data,
    });
  }

  public static getShopDetailApi(id: string | undefined) {
    return InstanceAxios().get(`/shop/shopUsers/${id}`);
  }
  public static addShopApi(name: string, area: string, city: string) {
    const data = {
      name: name,
      area: area,
      city: city,
    };
    return InstanceAxios().post("/shop/add", data);
  }
}
