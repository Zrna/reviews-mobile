import React from "react";
import { Text, View } from "react-native";

interface FlatListWrapperProps {
  class?: string;
  title?: string;
  children: React.ReactNode;
}

const FlatListWrapper: React.FC<FlatListWrapperProps> = ({ class: customClass, children, title }) => {
  return (
    <View className={`space-y-2 ${customClass}`}>
      <Text className="text-white font-pop-bold text-xl">{title}</Text>
      {children}
    </View>
  );
};

export default FlatListWrapper;
