import React from "react";
import { View } from "react-native";

import { Review } from "@/interfaces/reviews";
import { getRatingColor } from "@/utils/review";

interface IndicatorProps {
  rating: Review["rating"];
}

const Indicator: React.FC<IndicatorProps> = ({ rating }) => {
  const color = getRatingColor(rating);

  return <View className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />;
};

export default Indicator;
