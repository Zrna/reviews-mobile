import { clsx } from "clsx";
import { Link } from "expo-router";
import { useRef } from "react";
import { Image, Text, View } from "react-native";
import { ExternalLink } from "react-native-feather";

import { BottomSheet, BottomSheetControls, BottomSheetProps } from "@/components/BottomSheet";
import { Review } from "@/interfaces/reviews";
import { formatDate } from "@/utils/date";
import { streamingAppsMap } from "@/utils/platforms";
import { addUrlProtocol, getUrlDomain } from "@/utils/url";

const styles = {
  name: "text-stone-500 uppercase font-bold text-xs",
  value: "text-white capitalize",
};

interface BoxProps {
  name: string;
  value: string;
}

const Box = ({ name, value }: BoxProps) => {
  return (
    <View className="flex-1 gap-1 p-2 rounded-xl bg-stone-800">
      <Text className={styles.name}>{name}</Text>
      <Text className={styles.value}>{value}</Text>
    </View>
  );
};

interface DetailsBottomSheetProps {
  onReady: BottomSheetProps["onReady"];
  review: Review;
}

export const DetailsBottomSheet = ({ onReady, review }: DetailsBottomSheetProps) => {
  const controlsRef = useRef<BottomSheetControls>(null);

  const { watchAgain, media, type, createdAt, url } = review;

  const reviewUrlDomain = url && getUrlDomain(url);
  const app = streamingAppsMap[reviewUrlDomain || ""];

  return (
    <BottomSheet
      onReady={(controls) => {
        controlsRef.current = controls;
        onReady(controls);
      }}
      enableDynamicSizing
      title="Details"
    >
      <View className="flex-col gap-4">
        <View className="flex-row gap-2">
          <Box name="Watch again" value={watchAgain ? "Yes" : "No"} />
          <Box name="Review added" value={formatDate(createdAt)} />
        </View>
        {media?.overview && (
          <View className="gap-2">
            <Text className={styles.name}>Overview</Text>
            <Text className={clsx(styles.value, "normal-case")}>{media.overview}</Text>
          </View>
        )}
        <View className="gap-2">
          <Text className={styles.name}>Where to watch</Text>
          <Link href={(url ? addUrlProtocol(url) : "") as any}>
            <View className="flex-row border p-2 border-stone-800 rounded-xl items-center gap-2">
              {app?.img && <Image source={app.img} resizeMode="contain" className="w-6 h-6" />}
              <Text className={clsx(styles.value, "flex-1 normal-case")} numberOfLines={1} ellipsizeMode="tail">
                {url ?? "Not provided"}
              </Text>
              {url && <ExternalLink width={16} height={16} color="#fff" />}
            </View>
          </Link>
        </View>
        <View className="flex-row gap-2">
          {type && <Box name="Type" value={type} />}
          {media?.releaseDate && <Box name="Release Date" value={formatDate(media.releaseDate)} />}
        </View>
      </View>
    </BottomSheet>
  );
};
