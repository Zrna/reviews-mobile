import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Toast } from "toastify-react-native";

import { getAccountData, updateAccount } from "@/apis/account";
import { getErrorMessage } from "@/utils/error";

type UseAccountProps = {
  enabled?: boolean;
};

export const useAccount = (props?: UseAccountProps) => {
  return useQuery({
    queryKey: ["account"],
    queryFn: getAccountData,
    enabled: props?.enabled ?? true,
  });
};

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccount,
    onSuccess: (updatedData) => {
      if (queryClient.getQueryData(["account"])) {
        queryClient.setQueryData(["account"], updatedData);
      } else {
        queryClient.invalidateQueries({ queryKey: ["account"] });
      }
      Toast.success("Account updated");
    },
    onError: (error: AxiosError) => {
      return Toast.error(getErrorMessage(error), "top");
    },
  });
}
