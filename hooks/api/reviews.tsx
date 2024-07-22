import { useQuery } from "@tanstack/react-query";

import { getReviews } from "@/apis/reviews";

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
}
