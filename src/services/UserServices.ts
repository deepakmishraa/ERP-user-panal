import { InstanceAxios } from "../hooks/axiosConfig";

export class UserService {
  public static getUserApi() {
    return InstanceAxios().get("/user/users");
  }
  public static getAllRoleApi() {
    return InstanceAxios().get("/getroles");
  }
  public static addUserApi(
    name: string,
    email: string,
    mobileNo: number,
    role: string
  ) {
    const data = {
      name: name,
      email: email,
      mobileNo: mobileNo,
      role: role,
    };
    return InstanceAxios().post("/user/adduser", data);
  }
}
