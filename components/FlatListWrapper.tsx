import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FlatListWrapperProps {
  class?: string;
  title?: string;
  children: React.ReactNode;
  isBigTitle?: boolean;
  onPress?: () => void;
}

const FlatListWrapper: React.FC<FlatListWrapperProps> = ({
  class: customClass,
  children,
  title,
  isBigTitle = false,
  onPress,
}) => {
  return (
    <View className={`space-y-2 ${customClass}`}>
      <TouchableOpacity
        className="flex flex-row items-center justify-between"
        onPress={onPress}
        activeOpacity={onPress ? 0.5 : 1}
      >
        <Text
          className={`text-white ${isBigTitle ? "text-2xl tracking-[0.5px] font-pop-bold" : "text-lg font-pop-semibold"}`}
        >
          {title}
        </Text>
        {onPress && <Text className="text-primary font-pop-light text-sm">See all</Text>}
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default FlatListWrapper;
