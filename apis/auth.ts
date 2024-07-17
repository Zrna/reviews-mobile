import { LoginProps, RegisterProps } from "@/interfaces/auth";
import { backend } from "@/services/backend";

export const login = async (props: LoginProps): Promise<{ accessToken: string }> => {
  return await backend.post("/login", props);
};

export const register = async (props: RegisterProps): Promise<{ accessToken: string; message: "User registered" }> => {
  return await backend.post("/register", props);
};

export const logout = async () => {
  return await backend.post<"Logged out successfully">("/logout");
};
