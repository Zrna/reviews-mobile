import { useQuery } from "@tanstack/react-query";

import { getLatestReviews, getReviewById, getReviews } from "@/apis/reviews";

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
