import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Toast } from "toastify-react-native";

import {
  createReview,
  deleteReviewById,
  getLatestReviews,
  getReviewById,
  getReviews,
  getReviewsGroupedByRatings as getReviewsGroupedByRatingsApi,
  updateReviewById,
} from "@/apis/reviews";
import { CreateReview, GetReviewsGroupedByRatingsParams, UpdateReview } from "@/interfaces/reviews";
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviewsGroupedByRatings"] });
      await queryClient.invalidateQueries({ queryKey: ["latestReviews"] });
    },
    onError: (error) => {
      Alert.alert("", getErrorMessage(error));
      throw error;
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateReview }) => {
      return await updateReviewById({ id, data });
    },
    onSuccess: async (updatedData) => {
      await queryClient.invalidateQueries({ queryKey: ["reviews", updatedData.id.toString()] });
      Toast.success("Review updated");
    },
    onError: (error) => {
      Toast.error(getErrorMessage(error), "top");
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
      await queryClient.invalidateQueries({ queryKey: ["reviewsGroupedByRatings"] });
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

export const useReviewsGroupedByRatings = (options?: GetReviewsGroupedByRatingsParams) => {
  const { count = 10, rating = undefined } = options || {};

  return useQuery({
    queryKey: ["reviewsGroupedByRatings", count, rating],
    queryFn: () => getReviewsGroupedByRatingsApi({ count, rating }),
  });
};
