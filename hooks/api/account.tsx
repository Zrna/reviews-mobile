import { useQuery } from "@tanstack/react-query";

import { getAccountData } from "@/apis/account";

export const useAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: getAccountData,
  });
};
