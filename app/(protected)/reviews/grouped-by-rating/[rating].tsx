import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

import cowImg from "@/assets/images/cow/cow.png";
import { CustomButton } from "@/components";
import { BottomSheetControls } from "@/components/BottomSheet";
import ReviewCard from "@/components/ReviewCard";
import { CreateReviewBottomSheet } from "@/components/screens/create/CreateReviewBottomSheet";
import { useReviewsByRating } from "@/hooks/api/reviews";

const ReviewGroupedByRatingScreen = () => {
  const navigation = useNavigation();
  const { rating } = useLocalSearchParams();

  const parsedRating = parseInt(rating as string);
  const { data, isLoading, refetch, isRefetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviewsByRating({ rating: parsedRating });

  useEffect(() => {
    if (rating) {
      if (parseInt(rating as string) === 0) {
        navigation.setOptions({ title: "Your Not Rated reviews" });
      } else {
        navigation.setOptions({ title: `Your ${rating}-star reviews` });
      }
    }
  }, [rating, navigation]);

  useEffect(() => {
    if (isError) {
      Toast.error("Something went wrong", "top");
      navigation.goBack();
    }
  }, [isError, navigation]);

  const reviews = data?.pages.flatMap((page) => page.data) ?? [];
  const bottomSheetRef = useRef<BottomSheetControls>(null);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="h-full justify-center items-center bg-black px-3.5 pb-1">
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(review) => review.id.toString()}
            renderItem={({ item }) => <ReviewCard review={item} />}
            numColumns={3}
            contentContainerStyle={{ gap: 12 }}
            columnWrapperStyle={{ gap: 12 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator color="white" className="py-4" /> : <View className="h-10" />
            }
            ListEmptyComponent={
              <View className="space-y-5 h-[80vh] justify-center">
                <Image className="w-auto h-auto self-center" source={cowImg} />
                <CustomButton text="Create a review" onPress={() => bottomSheetRef.current?.open()} class="mt-10" />
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor="#9ae2bb" // green-200 - refresh icon color on iOS
                colors={["#23C06B"]} // green-500/primary - refresh icon color on Android
              />
            }
          />
        )}
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

export default ReviewGroupedByRatingScreen;
