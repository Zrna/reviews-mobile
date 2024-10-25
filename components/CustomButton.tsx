import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const variantsMap = {
  primary: {
    container: "bg-primary",
    text: "text-white",
  },
  secondary: {
    container: "bg-dark",
    text: "text-primary",
  },
  outlined: {
    container: "bg-black border border-primary",
    text: "text-white",
  },
  "outlined-secondary": {
    container: "bg-black border border-light-dark",
    text: "text-dimmed",
  },
};

interface CustomButtonProps {
  text?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  class?: string;
  textClass?: string;
  variant?: keyof typeof variantsMap;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const CustomButton = ({
  class: customClass,
  textClass,
  text,
  isLoading,
  isDisabled,
  isFullWidth,
  variant = "primary",
  icon,
  onPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isDisabled || isLoading}
      onPress={onPress}
      activeOpacity={0.7}
      className={`${variantsMap[variant].container} rounded-xl min-h-[62px] justify-center items-center ${isFullWidth ? "w-full" : ""} ${isLoading || isDisabled ? "opacity-60" : ""} ${customClass}`}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View className="flex-row space-x-1.5 items-center">
          {icon && icon}
          {text && (
            <Text className={`${variantsMap[variant].text} font-pop-semibold text-lg ${textClass}`}>{text}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
