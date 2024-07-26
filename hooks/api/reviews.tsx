import { useQuery } from "@tanstack/react-query";

import { getLatestReviews, getReviews } from "@/apis/reviews";

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
