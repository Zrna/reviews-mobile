import React from "react";
import { Image, Text, View } from "react-native";

import defaultPoster from "@/assets/images/default-poster.png";
import { Review } from "@/interfaces/reviews";

interface ReviewCardProps {
  review: Review;
  isBig?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isBig = false }) => {
  const imageSource = review.img ? { uri: `data:image/jpeg;base64,${review.img}` } : defaultPoster;
  const imgSize = isBig ? "w-[200px] h-[300px]" : "w-[110px] h-[160px]";

  return (
    <View>
      <Image source={imageSource} className={`${imgSize} rounded-md relative`} resizeMode="cover" />
      <Text
        className="text-white absolute bottom-0 w-full p-1.5"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {review.name}
      </Text>
    </View>
  );
};

export default ReviewCard;
