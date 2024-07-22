import { Reviews } from "@/interfaces/reviews";
import { backend } from "@/services/backend";

export const getReviews = async (): Promise<Reviews> => {
  return await backend.get("/api/reviews");
};
