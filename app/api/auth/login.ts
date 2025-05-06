import { api } from "@/ClientSWRConfig";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { setCookie } from "cookies-next";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api
    .post("api/login", { json: data })
    .json<LoginResponse>();

  // 토큰을 쿠키에 저장 (1시간)
  setCookie("token", response.access_token, {
    maxAge: 60 * 60, // 1시간
    path: "/",
  });

  return response;
};
