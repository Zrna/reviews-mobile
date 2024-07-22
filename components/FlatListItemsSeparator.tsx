import React from "react";
import { View } from "react-native";

interface FlatListItemsSeparatorProps {
  space?: string | number;
}

const FlatListItemsSeparator = ({ space = 1 }: FlatListItemsSeparatorProps) => {
  const height = typeof space === "number" ? space : `[${space}]`;

  return <View className={`h-${height}`} />;
};

export default FlatListItemsSeparator;
