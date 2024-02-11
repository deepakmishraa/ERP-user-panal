import { InstanceAxios } from "../../hooks/axiosConfig";
export class TokenService {
  public static getTokenDetail() {
    return InstanceAxios().get(
      `${process.env.REACT_APP_API_URL}/user/tokenDetail`
    );
  }
}
