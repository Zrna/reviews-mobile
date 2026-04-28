import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Animated,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import { z } from "zod";

import defaultPoster from "@/assets/images/default-poster.png";
import { CustomButton, CustomInput, Rating, WatchAgain } from "@/components";
import { BottomSheetControls } from "@/components/BottomSheet";
import { Indicator, Navbar, StreamingApp } from "@/components/screens/review";
import { DetailsBottomSheet } from "@/components/screens/review/DetailsBottomSheet";
import { useDeleteReview, useReviewById, useUpdateReview } from "@/hooks/api/reviews";
import { UpdateReview } from "@/interfaces/reviews";
import { formatDate } from "@/utils/date";
import { getErrorMessage } from "@/utils/error";
import { getUrlDomain } from "@/utils/url";

const UpdateSchema = z.object({
  url: z.string().min(2, "Must contain at least 2 characters").optional().nullable(),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional().nullable(),
  watchAgain: z.boolean().optional(),
  review: z.string().min(1, "Review must contain at least 1 character"),
});

const ReviewScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: review, isLoading, refetch: refetchReview, isRefetching } = useReviewById(id as string);
  const { mutateAsync: updateReview, isPending: isUpdating } = useUpdateReview();
  const { mutateAsync: deleteReview, isPending: isDeleting } = useDeleteReview();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting: isSubmittingUpdate, isDirty },
  } = useForm<UpdateReview>({
    defaultValues: { rating: 0, url: "", watchAgain: false, review: "" },
    values: review,
    resolver: zodResolver(UpdateSchema),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const bottomSheetRef = useRef<BottomSheetControls>(null);

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
          variant="outlined"
          class="mt-10"
          onPress={() => router.push("/home")}
        />
      </SafeAreaView>
    );
  }

  const imageSource = review.media?.img ? { uri: review.media.img } : defaultPoster;
  const reviewUrlDomain = review.url && getUrlDomain(review.url);

  const handleSave = async (data: UpdateReview) => {
    if (isDirty) {
      try {
        await updateReview({ id: review.id.toString(), data });
        setIsEditMode(false);
      } catch (error) {
        Toast.error(getErrorMessage(error));
      }
    } else {
      setIsEditMode(false);
    }
  };

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View className="flex flex-1">
        <StatusBar backgroundColor="transparent" style="auto" />
        <Navbar
          bgColor={backgroundColor}
          isEditMode={isEditMode}
          onEdit={() => setIsEditMode(true)}
          onSave={handleSubmit(handleSave)}
          onCancel={() => (setIsEditMode(false), reset())}
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
          <View className="p-3 pt-0 gap-4">
            <View className="gap-2">
              <Text
                className="text-white text-4xl font-pop-semibold self-center"
                onPress={() => isEditMode && Toast.warn("Name can't be changed")}
              >
                {review.name}
              </Text>
              {isEditMode ? (
                <View className="items-center mt-2">
                  <Rating control={control} hideLabel />
                </View>
              ) : (
                <View className="flex-row w-full justify-center items-center gap-2">
                  <Indicator rating={review.rating} />
                  <Text className="text-dimmed text-sm font-pop-semibold self-center">
                    {review.rating?.toFixed(1) ?? "Not"} Rated
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-row justify-between gap-2">
              <View
                className={`${isEditMode ? "w-1/2" : "w-1/3 items-center"} h-[${review.url || isEditMode ? "100px" : "50px"}] gap-2`}
              >
                <Text className="text-dimmed">{isEditMode ? "Link to watch" : "Watch it here"}</Text>
                {isEditMode ? (
                  <View className="w-full">
                    <CustomInput
                      control={control}
                      name="url"
                      className="text-sm"
                      selectTextOnFocus
                      keyboardType="url"
                      placeholder="Insert link"
                    />
                  </View>
                ) : review.url ? (
                  <StreamingApp link={review.url} name={reviewUrlDomain} showName />
                ) : (
                  <Text className="text-white">Link not provided</Text>
                )}
              </View>
              <View
                className={`${isEditMode ? "w-1/2" : "w-1/3"} h-[${review.url ? "100px" : "50px"}] gap-2 items-center`}
              >
                {isEditMode ? (
                  <WatchAgain control={control} />
                ) : (
                  <>
                    <Text className="text-dimmed">Recommend?</Text>
                    <Text className="text-white">{review.watchAgain ? "Yes" : "No"}</Text>
                  </>
                )}
              </View>
              {!isEditMode && (
                <Pressable
                  className={`w-1/3 h-[${review.url ? "100px" : "50px"}] gap-2 items-center`}
                  onPress={() => bottomSheetRef.current?.open()}
                >
                  <Text className="text-dimmed">Details</Text>
                  <Text className="text-primary">View</Text>
                </Pressable>
              )}
            </View>
          </View>
          <View className="px-4 gap-2 pb-[100px]">
            {isEditMode ? (
              <CustomInput
                label="Your thoughts"
                className="mt-2"
                control={control}
                name="review"
                componentType="textarea"
              />
            ) : (
              <>
                <Text className="text-dimmed">Your thoughts</Text>
                <Text className="text-white text-xl">{review.review}</Text>
              </>
            )}
            <Text className="text-dimmed text-xs italic pt-4">Added on {formatDate(review.createdAt)}</Text>
          </View>
        </ScrollView>
        {(isDeleting || isUpdating || isSubmittingUpdate) && (
          <View className="absolute w-full h-full bg-black opacity-80 justify-center z-50">
            <ActivityIndicator color="#23C06B" size="large" />
          </View>
        )}
      </Animated.View>
      <DetailsBottomSheet
        review={review}
        onReady={(controls) => {
          bottomSheetRef.current = controls;
        }}
      />
    </GestureHandlerRootView>
  );
};

export default ReviewScreen;
