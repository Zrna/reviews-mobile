import React from "react";
import { Image, Text, View } from "react-native";

import defaultPoster from "@/assets/images/default-poster.png";
import { Review } from "@/interfaces/reviews";

const ReviewCard = ({ review }: { review: Review }) => {
  const imageSource = review.img ? { uri: `data:image/jpeg;base64,${review.img}` } : defaultPoster;

  return (
    <View>
      <Image source={imageSource} className="w-[130px] h-[200px] rounded-md relative" resizeMode="cover" />
      <Text
        className="text-white absolute bottom-0 w-[130px] p-1.5"
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
