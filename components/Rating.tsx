import React from "react";
import { Control, Controller } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";

interface RatingProps {
  hideLabel?: boolean;
  control: Control<any>;
  isReadOnly?: boolean;
}

const Rating: React.FC<RatingProps> = ({ hideLabel, control, isReadOnly = false }) => {
  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { value, onChange } }) => (
        <View className="gap-2 mb-4">
          {hideLabel ? null : <Text className="text-dimmed font-pop-medium">Rating</Text>}
          <View className="flex-row items-center">
            <View className="flex-row px-2 gap-1.5">
              {Array.from(Array(5)).map((_, i) => {
                const elementValue = i + 1;
                const isActive = value ? elementValue <= value : false;

                return (
                  <TouchableOpacity
                    className={`flex items-center justify-center size-8 rounded-full border ${isActive ? "border-primary" : "border-white opacity-20"} cursor-pointer`}
                    key={`rating-${i}`}
                    onPress={() => {
                      if (!isReadOnly) {
                        onChange && onChange(elementValue);
                      }
                      Keyboard.dismiss();
                    }}
                  >
                    <View className={`size-2 rounded-full ${isActive ? "bg-primary" : "bg-white"}`} />
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
