import { InstanceAxios } from "../hooks/axiosConfig";

export class CategoryService {
  public static getAllCategoryApi() {
    return InstanceAxios().get("/category");
  }
}
