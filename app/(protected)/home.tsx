import React from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FlatListWrapper } from "@/components";
import { Navbar, ReviewCard } from "@/components/screens/home";
import { useReviews } from "@/hooks/api/reviews";

const Home = () => {
  const { data: reviews, refetch: refetchReviews, isRefetching, isLoading } = useReviews();

  return (
    <SafeAreaView className="h-full bg-black">
      {isLoading ? (
        <Text className="text-white">Loading...</Text>
      ) : (
        <ScrollView
          className="px-3 space-y-10"
          stickyHeaderIndices={[0]} // Ensure the index matches the position of the header
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetchReviews}
              tintColor="#9ae2bb" // green-200 - refresh icon color on iOS
              colors={["#23C06B"]} // green-500/primary - refresh icon color on Android
            />
          }
        >
          <Navbar />
          {/* TODO: here add the "Your Latest" reviews */}
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
