import { LoginProps, RegisterProps } from "@/interfaces/auth";
import { backend } from "@/services/backend";

export const login = async (args: LoginProps): Promise<{ accessToken: string }> => {
  return await backend.post("/login", args);
};

export const register = async (props: RegisterProps) => {
  return await backend.post<{ accessToken: string; message: "User registered" }>("/register", props);
};

export const logout = async () => {
  return await backend.post<"Logged out successfully">("/logout");
};
