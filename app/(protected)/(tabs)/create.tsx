import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { CustomButton, CustomInput, Rating, WatchAgain } from "@/components";
import { useCreateReview } from "@/hooks/api/reviews";
import { CreateReview } from "@/interfaces/reviews";

const CreateSchema = z.object({
  name: z.string().min(1, "Name must contain at least 1 character"),
  url: z.string().min(2, "Must contain at least 2 characters").optional(),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
  watchAgain: z.boolean().optional(),
  review: z.string().min(1, "Review must contain at least 1 character"),
});

const Create = () => {
  const { name } = useLocalSearchParams(); // the name param is from the search screen input

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm<CreateReview>({ resolver: zodResolver(CreateSchema) });

  const { mutateAsync: createReview } = useCreateReview();

  useEffect(() => {
    if (name) {
      setValue("name", name as string);
    }
  }, [name, setValue]);

  const handleCreate = async (data: CreateReview) => {
    Keyboard.dismiss();
    try {
      await createReview(data);
      router.push("/home");
      reset();
    } catch {
      // Error is already handled by the useCreateReview hook showing a toast
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-black" edges={["top", "left", "right"]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={reset}
              tintColor="#9ae2bb" // green-200 - refresh icon color on iOS
              colors={["#23C06B"]} // green-500/primary - refresh icon color on Android
            />
          }
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.select({ ios: 16, android: 12 }),
          }}
        >
          <View className="w-full p-4 pt-8 space-y-8 pb-2">
            <Text className="text-white font-pop-bold text-xl">Create a review</Text>
            <View>
              <CustomInput control={control} name="name" label="Movie/TV show name" />
              <CustomInput control={control} name="url" label="Link to watch or platform name" />
              <Rating control={control} />
              <WatchAgain control={control} />
              <CustomInput control={control} name="review" label="Your Review" componentType="textarea" />
              <CustomButton
                onPress={handleSubmit(handleCreate)}
                isFullWidth
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                text="Create"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Create;
