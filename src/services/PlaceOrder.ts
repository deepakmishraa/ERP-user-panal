import { InstanceAxios } from "../hooks/axiosConfig";

export class PlaceOrderServices {
  public static getAllOrderApi() {
    return InstanceAxios().get("/order/requirement");
  }
  public static AddOrderApi(product: string, quantity: number) {
    const data = {
      product: product,
      quantity: quantity,
    };
    return InstanceAxios().post("/order/requirement/add", data);
  }
}
