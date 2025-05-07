import { api } from "@/ClientSWRConfig";
import { PasswordChangeRequest } from "@/types/user";

export const changePassword = async (
  request: PasswordChangeRequest
): Promise<void> => {
  return api
    .put("api/profile/password", { body: JSON.stringify(request) })
    .json<void>();
};
