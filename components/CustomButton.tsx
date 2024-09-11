import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  class?: string;
  textClass?: string;
  onPress?: () => void;
}

const CustomButton = ({
  class: customClass,
  textClass,
  text,
  isLoading,
  isDisabled,
  isFullWidth,
  onPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isDisabled || isLoading}
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${isFullWidth ? "w-full" : ""} ${isLoading || isDisabled ? "opacity-60" : ""} ${customClass}`}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={`text-black font-psemibold text-lg ${textClass}`}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
