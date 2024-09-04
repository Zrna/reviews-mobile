import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Animated, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import defaultPoster from "@/assets/images/default-poster.png";
import { Indicator, Navbar, StreamingApp } from "@/components/screens/review";
import { useReviewById } from "@/hooks/api/reviews";
import { reactionsMap } from "@/utils/review";
import { getUrlDomain } from "@/utils/url";

const ReviewScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: review, isLoading } = useReviewById(id as string);

  // handle if user is not authorized to view the review

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-black">
        <ActivityIndicator color="white" />
      </SafeAreaView>
    );
  }

  if (!review) {
    return (
      <SafeAreaView className="h-full bg-black">
        <Text className="text-white text-xl">Review not found</Text>
      </SafeAreaView>
    );
  }

  const imageSource = review.img ? { uri: `data:image/jpeg;base64,${review.img}` } : defaultPoster;
  const reviewUrlDomain = review.url && getUrlDomain(review.url);

  const scrollY = new Animated.Value(0);
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View className="flex flex-1">
      <StatusBar backgroundColor="transparent" style="auto" />
      <Navbar bgColor={backgroundColor} />
      <ScrollView
        className="h-full bg-black relative"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        <ImageBackground source={imageSource} className="w-full h-[60vh]" resizeMode="cover">
          <LinearGradient
            className="h-full"
            colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
          />
        </ImageBackground>
        <View className="p-3 pt-0 space-y-6">
          <View className="mb-2">
            <Text className="text-white text-4xl font-pop-semibold self-center">{review.name}</Text>
            <View className="flex-row w-full justify-center items-center space-x-2">
              <Indicator rating={review.rating} />
              <Text className="text-dimmed text-sm font-pop-semibold self-center">
                {review.rating?.toFixed(1) ?? "Not"} Rated
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between space-x-2">
            <View className={`w-[33%] h-[${review.url ? "100px" : "50px"}] space-y-2 items-center`}>
              <Text className="text-dimmed">Watch it here</Text>
              {review.url ? (
                <StreamingApp link={review.url} name={reviewUrlDomain} showName />
              ) : (
                <Text className="text-white">Link not provided</Text>
              )}
            </View>
            <View className={`w-[33%] h-[${review.url ? "100px" : "50px"}] space-y-2 items-center`}>
              <Text className="text-dimmed">Recommend?</Text>
              <Text className="text-white border">{review.watchAgain ? "Yes, for sure!" : "Not really..."}</Text>
            </View>
            <View className={`w-[33%] h-[${review.url ? "100px" : "50px"}] space-y-2 items-center`}>
              <Text className="text-dimmed">Reaction</Text>
              <Text className="text-white">{reactionsMap[review.rating ?? 0].text}</Text>
            </View>
          </View>
          <View className="space-y-1">
            <Text className="text-dimmed">Your Review</Text>
            <Text className="text-white text-xl">{review.review}</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default ReviewScreen;
