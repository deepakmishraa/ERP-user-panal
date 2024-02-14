import { InstanceAxios } from "../hooks/axiosConfig";
import { IUmoType } from "../models/IUmoType";

export class PlaceOrderServices {
  public static getAllOrderApi(
    page?: number,
    pageSize?: number,
    category?: string,
    search?: string,
    date?: string
  ) {
    return InstanceAxios().get("/order/requirement", {
      params: {
        page: page,
        pagesize: pageSize,
        category: category,
        search: search,
        date: date,
      },
    });
  }

  public static getAllProductApi(
    page?: number,
    pageSize?: number,
    category?: string,
    search?: string
  ) {
    return InstanceAxios().get("/product/productwithquantity", {
      params: {
        category: category,
        page: page,
        pagesize: pageSize,
        search: search,
      },
    });
  }

  public static deleteRequirementItem(items: string[]) {
    const data = {
      productList: items,
    };
    return InstanceAxios().delete("/order/requirement/remove", { data });
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
