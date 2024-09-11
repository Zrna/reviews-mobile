import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

import { createReview, getLatestReviews, getReviewById, getReviews } from "@/apis/reviews";
import { CreateReview } from "@/interfaces/reviews";
import { getErrorMessage } from "@/utils/error";

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
}

export const useLatestReviews = () => {
  return useQuery({
    queryKey: ["latestReviews"],
    queryFn: getLatestReviews,
  });
};

export const useReviewById = (id: string) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewById(id),
    enabled: !!id,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReview) => {
      return await createReview(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["latestReviews"] });
    },
    onError: (error) => {
      Alert.alert("", getErrorMessage(error));
      throw error;
    },
  });
};
