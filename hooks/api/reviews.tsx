import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Toast } from "toastify-react-native";

import { createReview, deleteReviewById, getLatestReviews, getReviewById, getReviews } from "@/apis/reviews";
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

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteReviewById(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["latestReviews"] });
      router.push("/home");
      Toast.success("Review deleted");
    },
    onError: (error) => {
      Alert.alert("", getErrorMessage(error));
      throw error;
    },
  });
};
