import { api } from "@/ClientSWRConfig";
import { RegisterUserRequest, RegisterUserResponse } from "@/types/user";
export const register = async (
  userData: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  return api
    .post("api/register", { json: userData })
    .json<RegisterUserResponse>();
};
