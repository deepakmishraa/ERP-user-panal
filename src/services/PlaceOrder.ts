import { InstanceAxios } from "../hooks/axiosConfig";
import { IUmoType } from "../models/IUmoType";

export class PlaceOrderServices {
  public static getAllOrderApi(page?: number, pageSize?: number) {
    return InstanceAxios().get("/order/requirement", {
      params: {
        page: page,
        limit: pageSize,
      },
    });
  }

  public static getAllProductApi(
    page?: number,
    pageSize?: number,
    category?: string
  ) {
    return InstanceAxios().get("/product/productwithquantity", {
      params: {
        category: category,
        page: page,
        pagesize: pageSize,
      },
    });
  }

  public static AddOrderApi(product: string, quantity: number, umo: IUmoType) {
    const data = {
      product: product,
      quantity: quantity,
      UOM: umo,
    };
    return InstanceAxios().post("/order/requirement/add", data);
  }
}
