import { Review } from "@/interfaces/reviews";

export const getRatingColor = (rating: Review["rating"]) => {
  if (!rating) {
    return "#D0D0D0"; // dimmed
  }

  if (rating <= 2) {
    return "#C02323"; // error
  }

  if (rating === 3) {
    return "#FFA500"; // orange
  }

  return "#23C06B"; // primary
};
