import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

interface RatingProps {
  control: Control<any>;
  isReadOnly?: boolean;
  rating?: number | null;
}

const Rating: React.FC<RatingProps> = ({ control, isReadOnly = false }) => {
  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { value, onChange } }) => (
        <View className="space-y-2 mb-4">
          <Text className="text-dimmed font-pop-medium">Rating</Text>
          <View className="flex-row marker:items-center space-x-5">
            <View className="flex-row space-x-1.5">
              {Array.from(Array(5)).map((_, i) => {
                const elementValue = i + 1;
                const isActive = value ? elementValue <= value : false;

                return (
                  <TouchableOpacity
                    className={`flex items-center justify-center w-7 h-7 rounded-full border ${isActive ? "border-primary" : "border-white opacity-20"} cursor-pointer`}
                    key={`rating-${i}`}
                    onPress={() => {
                      if (!isReadOnly) {
                        onChange && onChange(elementValue);
                      }
                    }}
                  >
                    <View className={`w-2 h-2 rounded-full ${isActive ? "bg-primary" : "bg-white"}`} />
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text className="text-primary">{value ?? 0}/5</Text>
          </View>
        </View>
      )}
    />
  );
};

export default Rating;
