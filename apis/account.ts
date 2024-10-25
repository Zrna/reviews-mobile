import { AccountData, UpdateAccountProps } from "@/interfaces/account";
import { backend } from "@/services/backend";

export const getAccountData = async () => {
  return await backend.get<AccountData>("/api/account");
};

export const updateAccount = async (data: UpdateAccountProps) => {
  return await backend.put<AccountData>("/api/account", data);
};
