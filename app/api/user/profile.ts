import { api } from "@/ClientSWRConfig";
import { GetProfileResponse } from "@/types/user";

export const getProfile = async (): Promise<GetProfileResponse> => {
  return api.get("api/profile").json<GetProfileResponse>();
};
