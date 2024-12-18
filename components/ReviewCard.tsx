import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

import defaultPoster from "@/assets/images/default-poster.png";
import { Review } from "@/interfaces/reviews";
import { streamingAppsMap } from "@/utils/platforms";
import { truncateString } from "@/utils/string";
import { getUrlDomain } from "@/utils/url";

interface ReviewCardProps {
  review: Review;
  isBig?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isBig = false }) => {
  const urlDomain = review.url && getUrlDomain(review.url);

  const showPlatformLogo = !review.image && (urlDomain === "youtube" || urlDomain === "spotify");
  const imageSource = review.image
    ? { uri: `data:image/jpeg;base64,${review.image.img}` }
    : urlDomain && showPlatformLogo
      ? streamingAppsMap[urlDomain].img
      : defaultPoster;

  const cardSize = isBig ? "w-[200px] h-[300px]" : "w-[110px] h-[160px]";

  return (
    <Link href={`/reviews/${review.id}`}>
      <View
        className={`${cardSize} rounded-md flex justify-center items-center ${showPlatformLogo ? "border border-light-dark" : ""}`}
      >
        <Image
          source={imageSource}
          className={`${showPlatformLogo ? "w-12 h-12" : "w-full h-full"} rounded-md`}
          resizeMode={showPlatformLogo ? "contain" : "cover"}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="absolute bottom-0 w-full p-2 rounded-b-md"
        >
          <Text className="text-white font-pop-regular">{truncateString(review.name, isBig ? 45 : 23)}</Text>
        </LinearGradient>
      </View>
    </Link>
  );
};

export default ReviewCard;
