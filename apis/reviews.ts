import {
  CreateReview,
  GetReviewsGroupedByRatingsParams,
  Review,
  Reviews,
  ReviewsGroupedByRatings,
  UpdateReview,
} from "@/interfaces/reviews";
import { backend } from "@/services/backend";

export const createReview = async (data: CreateReview): Promise<Review> => {
  return await backend.post("/api/reviews", data);
};

export const updateReviewById = async ({ id, data }: { id: string; data: UpdateReview }): Promise<Review> => {
  return await backend.put(`/api/reviews/${id}`, data);
};

export const deleteReviewById = async (id: string): Promise<true> => {
  return await backend.delete(`/api/reviews/${id}`);
};

export const getReviews = async (): Promise<Reviews> => {
  return await backend.get("/api/reviews");
};

export const getLatestReviews = async (): Promise<Reviews> => {
  return await backend.get("/api/reviews/latest");
};

export const getReviewById = async (id: string): Promise<Review> => {
  return await backend.get(`/api/reviews/${id}`);
};

export const getReviewsGroupedByRatings = async ({
  count,
  rating,
}: GetReviewsGroupedByRatingsParams): Promise<ReviewsGroupedByRatings> => {
  const ratingParam = typeof rating === "number" ? `/${rating}` : "";
  const query = typeof count === "number" ? `?count=${count}` : "";

  return await backend.get(`/api/reviews/grouped-by-ratings${ratingParam}${query}`, {
    params: {
      count,
    },
  });
};
