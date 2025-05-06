// 엑세 토큰 시간 1시간
export interface LoginRequest {
  login_id: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
}
