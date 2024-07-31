import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";

import { useReviewById } from "@/hooks/api/reviews";

const ReviewScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { data: review, isLoading } = useReviewById(id as string);

  useEffect(() => {
    if (review) {
      navigation.setOptions({ title: review.name });
    }
  }, [navigation, review]);

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

  return (
    <SafeAreaView className="h-full bg-black">
      <Text className="text-white text-xl">{review.name}</Text>
    </SafeAreaView>
  );
};

export default ReviewScreen;
