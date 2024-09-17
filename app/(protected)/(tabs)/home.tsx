import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import cowImg from "@/assets/images/cow.png";
import { CustomButton, FlatListWrapper } from "@/components";
import { LatestReviewCard, Navbar, ReviewCard, Skeleton } from "@/components/screens/home";
import { useLatestReviews, useReviews } from "@/hooks/api/reviews";
import { Review } from "@/interfaces/reviews";

const Home = () => {
  const { data: latestReviews, refetch: refetchLatestReviews, isLoading: isLoadingLatestReviews } = useLatestReviews();
  const { data: reviews, refetch: refetchReviews, isRefetching, isLoading: isLoadingReviews } = useReviews();

  const [activeLatestReviewCard, setActiveLatestReviewCard] = useState<Review | undefined>(undefined);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveLatestReviewCard(viewableItems[0].item);
    }
  };

  const handleRefresh = async () => {
    await refetchLatestReviews();
    await refetchReviews();
  };

  useEffect(() => {
    if (reviews?.data.length) {
      setActiveLatestReviewCard(reviews.data[0]);
    }
  }, [reviews]);

  if (isLoadingLatestReviews || isLoadingReviews) {
    return (
      <SafeAreaView className="h-full bg-black">
        <Skeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView
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
        {!latestReviews?.data.length && !reviews?.data.length ? (
          <View className="space-y-5 h-[80vh] justify-center">
            <Image className="w-auto h-auto self-center" source={cowImg} />
            <CustomButton text="Create a review" onPress={() => router.push("/create")} class="mt-10" />
          </View>
        ) : (
          <>
            <FlatListWrapper title="Your Latest" class="mt-5">
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
              />
            </FlatListWrapper>
            <FlatListWrapper title="Your Reviews" class="mt-5">
              <FlatList
                data={reviews?.data}
                keyExtractor={(review) => review.id.toString()}
                renderItem={({ item }) => <ReviewCard review={item} />}
                ListEmptyComponent={() => <Text className="text-white">No Reviews</Text>}
                ItemSeparatorComponent={() => <View className="w-2" />}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
            </FlatListWrapper>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
