import { Link, useNavigation } from "expo-router";
import React from "react";
import { Animated, Platform } from "react-native";
import { ArrowLeftCircle, Search } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

interface NavbarProps {
  bgColor?: Animated.AnimatedInterpolation<string | number>;
}

const Navbar: React.FC<NavbarProps> = ({ bgColor }) => {
  const navigation = useNavigation();

  const isAndroid = Platform.OS === "android";

  return (
    <Animated.View
      className="w-full absolute z-10"
      style={{
        height: isAndroid ? 95 : 115,
        backgroundColor: bgColor,
      }}
    >
      <SafeAreaView className="flex-row px-3 justify-between items-center top-3 w-full">
        <ArrowLeftCircle stroke="rgba(255,255,255,0.7)" width={38} height={38} onPress={() => navigation.goBack()} />
        <Link href="search/[query]">
          <Search stroke="rgba(255,255,255,0.7)" width={32} height={32} />
        </Link>
      </SafeAreaView>
    </Animated.View>
  );
};

export default Navbar;
