import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";

interface WatchAgainProps {
  control: Control<any>;
}

const WatchAgain: React.FC<WatchAgainProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="watchAgain"
      render={({ field: { value, onChange } }) => (
        <View className="space-y-1 mb-4">
          <Text className="text-dimmed font-pop-medium">Watch again or recommend?</Text>
          <View className="flex-row space-x-4">
            <Text
              onPress={() => onChange(true)}
              className={`text-lg ${value === true ? "text-primary" : "text-dimmed opacity-50"}`}
            >
              Yes
            </Text>
            <Text
              onPress={() => onChange(false)}
              className={`text-lg ${value === false ? "text-primary" : "text-dimmed opacity-50"}`}
            >
              No
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default WatchAgain;
