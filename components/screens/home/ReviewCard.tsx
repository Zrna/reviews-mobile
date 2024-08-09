import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
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
  const cardSize = isBig ? "w-[200px] h-[300px]" : "w-[110px] h-[160px]";

  return (
    <Link href={`/reviews/${review.id}`}>
      <View className={`${cardSize} rounded-md`}>
        <Image source={imageSource} className="w-full h-full rounded-md" resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="absolute bottom-0 w-full p-2 rounded-b-md"
        >
          <Text className="text-white font-pop-regular">{review.name}</Text>
        </LinearGradient>
      </View>
    </Link>
  );
};

export default ReviewCard;
