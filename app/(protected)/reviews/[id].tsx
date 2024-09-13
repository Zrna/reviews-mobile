import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import defaultPoster from "@/assets/images/default-poster.png";
import { CustomButton } from "@/components";
import { Indicator, Navbar, StreamingApp } from "@/components/screens/review";
import { useDeleteReview, useReviewById } from "@/hooks/api/reviews";
import { reactionsMap } from "@/utils/review";
import { getUrlDomain } from "@/utils/url";

const ReviewScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: review, isLoading, refetch: refetchReview, isRefetching } = useReviewById(id as string);
  const { mutateAsync: deleteReview, isPending: isDeleting } = useDeleteReview();

  const [isEditMode, setIsEditMode] = useState(false);

  // handle if user is not authorized to view the review

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-black justify-center">
        <ActivityIndicator color="white" />
      </SafeAreaView>
    );
  }

  if (!review) {
    return (
      <SafeAreaView className="h-full bg-black justify-center items-center p-10">
        <Text className="text-white text-xl">Review not found</Text>
        <CustomButton
          text="Go to All Reviews"
          isFullWidth
          class="mt-10 bg-black border border-primary"
          textClass="text-dimmed text-lg"
          onPress={() => router.push("/home")}
        />
      </SafeAreaView>
    );
  }

  const imageSource = review.img ? { uri: `data:image/jpeg;base64,${review.img}` } : defaultPoster;
  const reviewUrlDomain = review.url && getUrlDomain(review.url);

  const handleDelete = () =>
    Alert.alert("Delete Review", `Are you sure you want to delete the review for ${review.name}?`, [
      { text: "Cancel", style: "cancel", onPress: () => undefined },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => (deleteReview(review.id.toString()), setIsEditMode(false)),
      },
    ]);

  const scrollY = new Animated.Value(0);
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"],
    extrapolate: "clamp",
  });

  const isAndroid = Platform.OS === "android";

  return (
    <Animated.View className="flex flex-1">
      <StatusBar backgroundColor="transparent" style="auto" />
      <Navbar
        bgColor={backgroundColor}
        isEditMode={isEditMode}
        onEdit={() => setIsEditMode(true)}
        onSave={() => undefined}
        onCancel={() => setIsEditMode(false)}
        onDelete={handleDelete}
      />
      <ScrollView
        className="h-full bg-black relative"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchReview}
            tintColor="#9ae2bb" // green-200 - refresh icon color on iOS
            colors={["#23C06B"]} // green-500/primary - refresh icon color on Android
          />
        }
      >
        <ImageBackground source={imageSource} className="w-full h-[60vh]" resizeMode="cover">
          <LinearGradient
            className="h-full"
            colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
          />
        </ImageBackground>
        <View className="p-3 pt-0 space-y-4">
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
            <View className={`w-1/3 h-[${review.url ? "100px" : "50px"}] space-y-2 items-center`}>
              <Text className="text-dimmed">Watch it here</Text>
              {review.url ? (
                <StreamingApp link={review.url} name={reviewUrlDomain} showName />
              ) : (
                <Text className="text-white">Link not provided</Text>
              )}
            </View>
            <View className={`w-1/3 h-[${review.url ? "100px" : "50px"}] space-y-2 items-center`}>
              <Text className="text-dimmed">Recommend?</Text>
              <Text className="text-white">{review.watchAgain ? "Yes, for sure!" : "Not really..."}</Text>
            </View>
            <View className={`w-1/3 h-[${review.url ? "100px" : "50px"}] space-y-2 items-center`}>
              <Text className="text-dimmed">Reaction</Text>
              <Text className="text-white">{reactionsMap[review.rating ?? 0].text}</Text>
            </View>
          </View>
        </View>
        <View className={`${isAndroid ? "pt-2" : ""} px-3 space-y-1 pb-[100px]`}>
          <Text className="text-dimmed">Your Review</Text>
          <Text className="text-white text-xl">{review.review}</Text>
        </View>
      </ScrollView>
      {isDeleting && (
        <View className="absolute w-full h-full bg-black opacity-80 justify-center z-50">
          <ActivityIndicator color="#23C06B" size="large" />
        </View>
      )}
    </Animated.View>
  );
};

export default ReviewScreen;
