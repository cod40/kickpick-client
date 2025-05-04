export interface RegisterUserRequest {
  login_id: string;
  password: string;
  name: string;
  team: string;
  team_code: string;
  role_code?: string;
  profile_image?: string;
}

export interface RegisterUserResponse {
  id: number;
  login_id: string;
  name: string;
  team: string;
  role: "user";
}

export interface ValidationError {
  detail: Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}
