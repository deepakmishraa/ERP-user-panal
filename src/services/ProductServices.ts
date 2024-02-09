import { InstanceAxios } from "../hooks/axiosConfig";

export class ProductServices {
  public static getAllProductApi() {
    return InstanceAxios().get("/product");
  }
}
