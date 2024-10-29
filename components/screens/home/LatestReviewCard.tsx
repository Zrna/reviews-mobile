import * as Animatable from "react-native-animatable";

import ReviewCard from "@/components/ReviewCard";
import { Review } from "@/interfaces/reviews";

const zoomIn = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};

interface LatestReviewCardProps {
  activeItem: Review | undefined;
  review: Review;
}

const LatestReviewCard: React.FC<LatestReviewCardProps> = ({ activeItem, review }) => {
  if (!activeItem) {
    return null;
  }

  return (
    <Animatable.View animation={activeItem.id === review.id ? zoomIn : zoomOut} duration={500}>
      <ReviewCard review={review} isBig />
    </Animatable.View>
  );
};

export default LatestReviewCard;
