import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from "react-native";
import { Search as SearchIcon } from "react-native-feather";

import cowImg from "@/assets/images/cow/cow.png";
import { CustomButton, CustomInput } from "@/components";
import ReviewCard from "@/components/ReviewCard";
import { useReviews } from "@/hooks/api/reviews";

const Search = () => {
  const { control } = useForm();
  const {
    data,
    isLoading: isLoadingReviews,
    refetch: refetchReviews,
    isRefetching: isRefetchingReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviews();

  const reviews = data?.pages.flatMap((page) => page.data) ?? [];
  const [search, setSearch] = useState("");

  return (
    // we use the `View` instead of `SafeAreaView` because we're using the header tab back button.
    // the `SafeAreaView` will add unnecessary padding to the bottom of the tab bar.
    <View className="flex-1 justify-center items-center bg-black px-3.5">
      <CustomInput
        control={control}
        placeholder="Search movies, shows..."
        name="search"
        onClear={() => setSearch("")}
        Icon={<SearchIcon stroke="rgba(255,255,255,1)" width={28} height={28} />}
        autoFocus
        value={search}
        onChangeText={setSearch}
        containerClassName="mt-3"
      />
      {isLoadingReviews ? (
        <ActivityIndicator color="white" />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={reviews.filter((review) => review.name.toLowerCase().includes(search.toLowerCase()))}
          renderItem={({ item }) => <ReviewCard review={item} />}
          numColumns={3}
          contentContainerStyle={{ gap: 18 }}
          columnWrapperStyle={{ gap: 12 }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator color="white" className="py-4" /> : <View className="h-10" />
          }
          ListEmptyComponent={
            <View className="space-y-5">
              <Text className="text-dimmed self-center">No Reviews Found</Text>
              <Image className="w-auto h-auto self-center" source={cowImg} />
              <CustomButton
                text={search ? `Add review for ${search}` : "Create a review"}
                onPress={() =>
                  router.push({
                    pathname: "/create",
                    params: {
                      name: search,
                    },
                  })
                }
                class="mt-10"
              />
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingReviews}
              onRefresh={refetchReviews}
              tintColor="#9ae2bb"
              colors={["#23C06B"]}
            />
          }
        />
      )}
    </View>
  );
};

export default Search;
