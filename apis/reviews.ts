import {
  CreateReview,
  GetReviewsByRatingParams,
  Review,
  Reviews,
  ReviewsByRating,
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

export const getReviewsGroupedByRatings = async (): Promise<ReviewsGroupedByRatings> => {
  return await backend.get("/api/reviews/grouped-by-ratings");
};

export const getReviewsByRating = async ({
  rating,
  page,
  pageSize,
}: GetReviewsByRatingParams): Promise<ReviewsByRating> => {
  return await backend.get(`/api/reviews/rating/${rating}`, {
    params: {
      ...(page !== undefined && { page }),
      ...(pageSize !== undefined && { pageSize }),
    },
  });
};
