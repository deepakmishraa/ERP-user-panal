import { InstanceAxios } from "../hooks/axiosConfig";

export class PlaceOrderServices {
  public static getAllOrderApi() {
    return InstanceAxios().get("/order/requirement");
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

  public static AddOrderApi(product: string, quantity: number) {
    const data = {
      product: product,
      quantity: quantity,
    };
    return InstanceAxios().post("/order/requirement/add", data);
  }
}
