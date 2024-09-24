import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import cowImg from "@/assets/images/cow.png";
import { CustomButton } from "@/components";
import { ReviewCard } from "@/components/screens/home";
import { useReviewsGroupedByRatings } from "@/hooks/api/reviews";

const ReviewGroupedByRatingScreen = () => {
  const navigation = useNavigation();
  const { rating } = useLocalSearchParams();

  const {
    data: groupedReviews,
    isLoading,
    refetch,
    isRefetching,
  } = useReviewsGroupedByRatings({
    count: 18,
    rating: rating ? parseInt(rating as string) : undefined,
  });

  useEffect(() => {
    if (rating) {
      if (parseInt(rating as string) === 0) {
        navigation.setOptions({ title: "Your Not Rated reviews" });
      } else {
        navigation.setOptions({ title: `Your ${rating}-star reviews` });
      }
    }
  }, [rating, navigation]);

  return (
    <SafeAreaView className="h-full justify-center items-center bg-black px-3.5 pb-1">
      <ScrollView
        className="w-full"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#9ae2bb" // green-200 - refresh icon color on iOS
            colors={["#23C06B"]} // green-500/primary - refresh icon color on Android
          />
        }
      >
        {isLoading ? (
          <View className="h-[90%]">
            <ActivityIndicator color="white" />
          </View>
        ) : (
          <>
            {groupedReviews?.map(({ rating, reviews }) => (
              <FlatList
                key={`${rating}-star-reviews-section`}
                data={reviews}
                renderItem={({ item }) => <ReviewCard review={item} />}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={{ gap: 12 }}
                columnWrapperStyle={{ gap: 12 }}
                ListFooterComponent={<View className="h-10" />} // To add space at the bottom
                ListEmptyComponent={
                  <View className="space-y-5 h-[80vh] justify-center">
                    <Image className="w-auto h-auto self-center" source={cowImg} />
                    <CustomButton text="Create a review" onPress={() => router.push("/create")} class="mt-10" />
                  </View>
                }
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewGroupedByRatingScreen;
