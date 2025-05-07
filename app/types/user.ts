// 기본이 되는 User 인터페이스 정의
export interface User {
  id: number;
  login_id: string;
  name: string;
  team: string;
  role: "user" | "manager" | "admin";
  positions: string[];
  profile_image?: string;
}

// RegisterUserRequest는 id가 없고 password가 필요하므로 별도로 유지
export interface RegisterUserRequest {
  login_id: string;
  password: string;
  name: string;
  team: string;
  team_code: string;
  profile_image?: string;
  role_code?: string;
  positions: string[];
}

export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
}

// User 인터페이스를 재사용
export type RegisterUserResponse = User;

// User 인터페이스를 재사용
export type GetProfileResponse = User;
