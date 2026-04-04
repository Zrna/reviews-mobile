import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Film, Mic, MoreHorizontal, Tv, Youtube } from "react-native-feather";

import { BottomSheet, BottomSheetControls, BottomSheetProps } from "@/components/BottomSheet";
import { MediaType } from "@/interfaces/reviews";

const MEDIA_OPTIONS: { label: string; value: MediaType; icon: React.ComponentType<any> }[] = [
  { label: "Movie", value: "movie", icon: Film },
  { label: "TV Show / Serie", value: "tv", icon: Tv },
  { label: "Podcast", value: "podcast", icon: Mic },
  { label: "Youtube", value: "youtube", icon: Youtube },
  { label: "Other", value: "other", icon: MoreHorizontal },
];

interface CreateReviewBottomSheetProps {
  onReady: BottomSheetProps["onReady"];
  onSelect: (mediaType: MediaType) => void;
}

export const CreateReviewBottomSheet = ({ onReady, onSelect }: CreateReviewBottomSheetProps) => {
  const controlsRef = useRef<BottomSheetControls>(null);

  const handleSelect = (mediaType: MediaType) => {
    controlsRef.current?.close();
    onSelect(mediaType);
  };

  return (
    <BottomSheet
      onReady={(controls) => {
        controlsRef.current = controls;
        onReady(controls);
      }}
      enableDynamicSizing
      title="What type of media do you want to review?"
    >
      <View className="flex-col flex-wrap gap-2">
        {MEDIA_OPTIONS.map((option) => {
          const Icon = option.icon;

          return (
            <Pressable
              className="flex flex-row items-center p-3 rounded-lg bg-[#262626] active:bg-[#333] w-full"
              key={option.value}
              onPress={() => handleSelect(option.value)}
            >
              <Icon width={32} height={32} color="#d9d9d9" />
              <Text className="text-white text-sm pl-3">{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </BottomSheet>
  );
};
