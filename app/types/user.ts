export interface User {
  id: number;
  login_id: string;
  name: string;
  team_id: number;
  role: "user" | "admin";
}
