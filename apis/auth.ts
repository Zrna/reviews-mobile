import { LoginProps } from "@/interfaces/auth";
import { backend } from "@/services/backend";

export const login = async (args: LoginProps): Promise<{ accessToken: string }> => {
  return await backend.post("/login", args);
};
