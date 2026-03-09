import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Toast } from "toastify-react-native";

import {
  createReview,
  deleteReviewById,
  getLatestReviews,
  getReviewById,
  getReviews,
  getReviewsByRating,
  getReviewsGroupedByRatings,
  updateReviewById,
} from "@/apis/reviews";
import { CreateReview, GetReviewsByRatingParams, GetReviewsParams, UpdateReview } from "@/interfaces/reviews";
import { getErrorMessage } from "@/utils/error";

export function useReviews({ pageSize }: Omit<GetReviewsParams, "page"> = {}) {
  return useInfiniteQuery({
    queryKey: ["reviews", pageSize],
    queryFn: ({ pageParam }) => getReviews({ page: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
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
      await queryClient.invalidateQueries({ queryKey: ["reviewsByRating"] });
      await queryClient.invalidateQueries({ queryKey: ["latestReviews"] });
      Toast.success("Review created");
    },
    onError: (error) => {
      Toast.error(getErrorMessage(error));
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
      await queryClient.invalidateQueries({ queryKey: ["reviewsByRating"] });
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

export const useReviewsGroupedByRatings = () => {
  return useQuery({
    queryKey: ["reviewsGroupedByRatings"],
    queryFn: getReviewsGroupedByRatings,
  });
};

export const useReviewsByRating = ({ rating, pageSize }: Omit<GetReviewsByRatingParams, "page">) => {
  return useInfiniteQuery({
    queryKey: ["reviewsByRating", rating, pageSize],
    queryFn: ({ pageParam }) => getReviewsByRating({ rating, page: pageParam, pageSize }),
    enabled: rating !== undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
  });
};
