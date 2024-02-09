import { InstanceAxios } from "../hooks/axiosConfig";

export class OtherServie {
  public static getAllRoleApi() {
    return InstanceAxios().get("/getroles");
  }
}
