import { RegisterUserRequest, RegisterUserResponse } from "@/types/auth";
import { api } from "@/ClientSWRConfig";

export const register = async (
  userData: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  return api
    .post("api/register", { json: userData })
    .json<RegisterUserResponse>();
};
