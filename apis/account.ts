import { AccountData } from "@/interfaces/account";
import { backend } from "@/services/backend";

export const getAccountData = async () => {
  return await backend.get<AccountData>("/api/account");
};
