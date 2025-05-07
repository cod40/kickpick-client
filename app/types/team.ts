export interface Team {
  id: number;
  name: string;
}

export interface CreateTeamRequest {
  name: string;
  team_code: string;
  role_code: string;
  description: string;
}
