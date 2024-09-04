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

export const reactionsMap: { [key: number]: { icon: any; text: string } } = {
  0: { icon: "reaction0", text: "Do not watch" },
  1: { icon: "reaction1", text: "I wish I hadn't watched" },
  2: { icon: "reaction2", text: "Boring" },
  3: { icon: "reaction3", text: "Not great, not terrible" },
  4: { icon: "reaction4", text: "It's great" },
  5: { icon: "reaction5", text: "Loving it!" },
};
