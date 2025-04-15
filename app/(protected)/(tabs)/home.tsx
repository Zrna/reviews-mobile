import { router, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View, ViewToken } from "react-native";
import { Plus } from "react-native-feather";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import cowImg from "@/assets/images/cow/cow.png";
import cowWithCup from "@/assets/images/cow/cow-with-cup.png";
import { CustomButton, FlatListWrapper, ReviewCard } from "@/components";
import { LatestReviewCard, Navbar, Skeleton } from "@/components/screens/home";
import { useLatestReviews, useReviewsGroupedByRatings } from "@/hooks/api/reviews";
import { Review } from "@/interfaces/reviews";
import { getRatingTitle } from "@/utils/ratingTitles";

const Home = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();

  const { data: latestReviews, refetch: refetchLatestReviews, isLoading: isLoadingLatestReviews } = useLatestReviews();
  const {
    data: reviews,
    refetch: refetchReviews,
    isRefetching,
    isLoading: isLoadingReviews,
  } = useReviewsGroupedByRatings();

  const [activeLatestReviewCard, setActiveLatestReviewCard] = useState<Review | undefined>(undefined);
  const scrollViewRef = useRef<ScrollView>(null);

  const viewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].item) {
      const newReview = viewableItems[0].item as Review;
      setActiveLatestReviewCard((prev) => {
        if (prev?.id === newReview.id) return prev;
        return newReview;
      });
    }
  }, []);

  const handleRefresh = async () => {
    await refetchLatestReviews();
    await refetchReviews();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      scrollViewRef.current?.scrollTo({ y: 0 });
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoadingLatestReviews || isLoadingReviews) {
    return (
      <SafeAreaView className="h-full bg-black">
        <Skeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-black"
      style={{
        paddingBottom: -safeAreaInsets.bottom, // fixes the SafeAreaView padding issue on tab bar
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        className="px-3 space-y-10"
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
        {!latestReviews?.data.length && reviews?.every((group) => group.reviews.length === 0) ? (
          <View className="space-y-5 h-[80vh] justify-center">
            <Image className="w-auto h-auto self-center" source={cowImg} />
            <CustomButton text="Create a review" onPress={() => router.push("/create")} class="mt-10" />
          </View>
        ) : (
          <>
            <FlatListWrapper title="Your Latest" class="mt-5" isBigTitle>
              <FlatList
                data={latestReviews?.data}
                keyExtractor={(review) => review.id.toString()}
                renderItem={({ item }) => <LatestReviewCard activeItem={activeLatestReviewCard} review={item} />}
                ListEmptyComponent={() => <Text className="text-white">No Reviews</Text>}
                ItemSeparatorComponent={() => <View className="w-2" />}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={viewableItemsChanged}
                horizontal
                viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                contentOffset={{ x: 0, y: 0 }}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                removeClippedSubviews={true}
                ListFooterComponent={
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-[200px] h-[300px] flex-row space-x-1 p-6 justify-center items-center ml-2"
                    onPress={() => router.push("/create")}
                    style={{ borderWidth: 3, borderStyle: "dashed", borderColor: "#23C06B", borderRadius: 6 }}
                    accessibilityLabel="Create new review"
                    accessibilityHint="Tap to create a new review"
                    accessibilityRole="button"
                  >
                    <Image source={cowWithCup} className="w-[150px] h-[150px] absolute bottom-[-70px] right-0 flex-1" />
                    <Plus stroke="white" width={20} height={20} />
                    <Text className="text-white font-pop-medium text-lg">Add new</Text>
                  </TouchableOpacity>
                }
              />
            </FlatListWrapper>
            {reviews?.map(({ rating, reviews }) => (
              <FlatListWrapper
                title={getRatingTitle(rating)}
                class={`mt-6 ${rating === null && "mb-10"}`}
                key={`${rating}-star-reviews-section`}
                onPress={reviews.length ? () => router.push(`/reviews/grouped-by-rating/${rating || 0}`) : undefined}
              >
                <FlatList
                  data={reviews}
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
