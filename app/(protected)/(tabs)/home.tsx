import { router } from "expo-router";
import React, { useRef } from "react";
import { FlatList, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import cowImg from "@/assets/images/cow/cow.png";
import { CustomButton, FlatListWrapper, ReviewCard } from "@/components";
import { BottomSheetControls } from "@/components/BottomSheet";
import { CreateReviewBottomSheet } from "@/components/screens/create/CreateReviewBottomSheet";
import { LatestReviewsCarousel, Navbar, Skeleton } from "@/components/screens/home";
import { useLatestReviews, useReviewsGroupedByRatings } from "@/hooks/api/reviews";
import { getRatingTitle } from "@/utils/ratingTitles";

const Home = () => {
  const safeAreaInsets = useSafeAreaInsets();

  const { data: latestReviews, refetch: refetchLatestReviews, isLoading: isLoadingLatestReviews } = useLatestReviews();
  const {
    data: reviews,
    refetch: refetchReviews,
    isRefetching,
    isLoading: isLoadingReviews,
  } = useReviewsGroupedByRatings();

  const scrollViewRef = useRef<ScrollView>(null);
  const bottomSheetRef = useRef<BottomSheetControls>(null);

  const handleRefresh = async () => {
    await refetchLatestReviews();
    await refetchReviews();
  };

  if (isLoadingLatestReviews || isLoadingReviews) {
    return (
      <SafeAreaView className="h-full bg-black">
        <Skeleton />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        className="flex-1 bg-black"
        style={{
          paddingBottom: -safeAreaInsets.bottom, // fixes the SafeAreaView padding issue on tab bar
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          className="px-2"
          contentContainerClassName="gap-4"
          stickyHeaderIndices={[0]} // Ensure the index matches the position of the header
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor="#9ae2bb" // green-200 - refresh icon color on iOS
              colors={["#23C06B"]} // green-500/primary - refresh icon color on Android
            />
          }
        >
          <Navbar />
          {!latestReviews?.data.length && reviews?.every((group) => group.data.length === 0) ? (
            <View className="gap-5 h-[80vh] justify-center">
              <Image className="w-auto h-auto self-center" source={cowImg} />
              <CustomButton text="Create a review" onPress={() => bottomSheetRef.current?.open()} class="mt-10" />
            </View>
          ) : (
            <View>
              <FlatListWrapper title="Your Latest" isBigTitle class="h-[68vh]">
                <LatestReviewsCarousel
                  reviews={latestReviews?.data ?? []}
                  onAddNew={() => bottomSheetRef.current?.open()}
                />
              </FlatListWrapper>
              {reviews?.map(({ rating, data }) => (
                <FlatListWrapper
                  title={getRatingTitle(rating)}
                  class={`mt-6 ${rating === null && "mb-10"}`}
                  key={`${rating}-star-reviews-section`}
                  onPress={reviews.length ? () => router.push(`/reviews/grouped-by-rating/${rating || 0}`) : undefined}
                >
                  <FlatList
                    data={data}
                    keyExtractor={(review) => review.id.toString()}
                    renderItem={({ item }) => <ReviewCard review={item} />}
                    ListEmptyComponent={() => <Text className="text-white">No Reviews</Text>}
                    ItemSeparatorComponent={() => <View className="w-2" />}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    windowSize={5}
                    removeClippedSubviews={true}
                  />
                </FlatListWrapper>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <CreateReviewBottomSheet
        onReady={(controls) => {
          bottomSheetRef.current = controls;
        }}
        onSelect={(mediaType) => {
          router.push({
            pathname: "/create",
            params: {
              mediaType,
            },
          });
        }}
      />
    </GestureHandlerRootView>
  );
};

export default Home;
