import { Review, Reviews } from "@/interfaces/reviews";
import { backend } from "@/services/backend";

export const getReviews = async (): Promise<Reviews> => {
  return await backend.get("/api/reviews");
};

export const getLatestReviews = async (): Promise<Reviews> => {
  return await backend.get("/api/reviews/latest");
};

export const getReviewById = async (id: string): Promise<Review> => {
  return await backend.get(`/api/reviews/${id}`);
};
