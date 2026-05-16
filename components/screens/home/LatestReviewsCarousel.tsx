import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Plus } from "react-native-feather";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

import cowWithCup from "@/assets/images/cow/cow-with-cup.png";
import defaultPoster from "@/assets/images/default-poster.png";
import { Review } from "@/interfaces/reviews";
import { streamingAppsMap } from "@/utils/platforms";
import { getUrlDomain } from "@/utils/url";

type CarouselItem = Review | { kind: "add" };

const SCREEN_WIDTH = Dimensions.get("window").width;
const HERO_HEIGHT = 500;
const PARENT_HORIZONTAL_PADDING = 8;
const PAGINATION_DOT_SIZE = 6;

interface LatestReviewsCarouselProps {
  reviews: Review[];
  onAddNew: () => void;
}

const HeroCard: React.FC<{ review: Review }> = ({ review }) => {
  const urlDomain = review.url && getUrlDomain(review.url);
  const showPlatformLogo = !review.media && (urlDomain === "youtube" || urlDomain === "spotify");

  const imageSource = review.media?.img
    ? { uri: review.media.img }
    : urlDomain && showPlatformLogo
      ? streamingAppsMap[urlDomain].img
      : defaultPoster;

  return (
    <Link href={`/reviews/${review.id}`}>
      <View style={{ width: SCREEN_WIDTH, height: HERO_HEIGHT }}>
        <Image
          source={imageSource}
          style={{
            width: showPlatformLogo ? "30%" : "100%",
            height: "100%",
            alignSelf: "center",
          }}
          resizeMode={showPlatformLogo ? "contain" : "cover"}
        />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} className="absolute bottom-0 w-full p-4 pt-9">
          <View className="flex-1 items-center justify-center gap-3">
            <Text className="text-white text-4xl text-center font-extrabold" numberOfLines={2}>
              {review.name}
            </Text>
            {review.media?.genres && (
              <View className="flex-row items-center gap-2">
                {review.media.genres.map((genre) => (
                  <View key={review.name + "-" + genre.name} className="bg-white/20 px-2 py-1 rounded">
                    <Text className="text-white text-xs">{genre.name}</Text>
                  </View>
                ))}
              </View>
            )}
            <Text className="text-dimmed text-center" numberOfLines={2}>
              {review.review}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Link>
  );
};

const LatestReviewsCarousel: React.FC<LatestReviewsCarouselProps> = ({ reviews, onAddNew }) => {
  const progress = useSharedValue(0);
  const items: CarouselItem[] = [...reviews, { kind: "add" }];

  return (
    <View style={{ marginHorizontal: -PARENT_HORIZONTAL_PADDING }}>
      <Carousel
        width={SCREEN_WIDTH}
        height={HERO_HEIGHT}
        data={items}
        loop={false}
        // autoPlay
        autoPlayInterval={2000}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        onConfigurePanGesture={(g) => {
          g.activeOffsetX([-10, 10]);
          g.failOffsetY([-5, 5]);
        }}
        renderItem={({ item }) => (
          <View className="flex-1 items-center justify-center">
            {"kind" in item ? (
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-[300px] h-[400px] flex-row justify-center items-center"
                onPress={onAddNew}
                style={{ borderWidth: 3, borderStyle: "dashed", borderColor: "#23C06B", borderRadius: 6 }}
                accessibilityLabel="Create new review"
                accessibilityHint="Tap to create a new review"
                accessibilityRole="button"
              >
                <Image source={cowWithCup} className="w-[150px] h-[150px] absolute bottom-[-70px] right-0 flex-1" />
                <Plus stroke="white" width={20} height={20} />
                <Text className="text-white font-pop-medium text-2xl">Add new</Text>
              </TouchableOpacity>
            ) : (
              <HeroCard review={item} />
            )}
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={items}
        dotStyle={{
          backgroundColor: "rgba(255,255,255,0.3)",
          width: PAGINATION_DOT_SIZE,
          height: PAGINATION_DOT_SIZE,
          borderRadius: PAGINATION_DOT_SIZE / 2,
        }}
        activeDotStyle={{
          backgroundColor: "white",
          width: PAGINATION_DOT_SIZE,
          height: PAGINATION_DOT_SIZE,
          borderRadius: PAGINATION_DOT_SIZE / 2,
        }}
        containerStyle={{ gap: 8, marginTop: 16 }}
      />
    </View>
  );
};

export default LatestReviewsCarousel;
