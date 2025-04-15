import React, { useState } from "react";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { Eye, EyeOff, X } from "react-native-feather";

interface CustomInputProps extends TextInputProps {
  componentType?: "input" | "textarea";
  containerClassName?: string;
  name: string;
  label?: string;
  control: Control<any>;
  rules?: Pick<RegisterOptions<FieldValues>, "maxLength" | "minLength" | "validate" | "required">;
  secureTextEntry?: boolean;
  Icon?: React.ReactElement<{ color: string; width?: number; height?: number }>;
  onClear?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  componentType = "input",
  containerClassName,
  control,
  name,
  rules = {},
  label,
  secureTextEntry = false,
  Icon,
  onClear,
  ...props
}) => {
  const [isValueHidden, setShowIsValueHidden] = useState(secureTextEntry);
  const isTextArea = componentType === "textarea";

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        return (
          <View className={`w-full space-y-1 mb-4 ${containerClassName}`}>
            <View className="space-y-1">
              {label && <Text className="text-dimmed font-pop-medium">{label}</Text>}
              <View
                className={`flex-row justify-between bg-dark text-white items-center px-3 rounded-xl ${isTextArea ? "h-[200px]" : "h-16"} border border-light-dark focus:border-primary ${error ? "border border-red-500" : ""}`}
              >
                {Icon && React.cloneElement(Icon, { width: 24, height: 24, color: error ? "#ef4444" : "#D0D0D0" })}
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={secureTextEntry && isValueHidden}
                  placeholderTextColor="#b3b3b3"
                  className={`text-white flex-1 text-base h-full ${Icon ? "ml-2" : ""}`}
                  hitSlop={{ top: 20, bottom: 20 }}
                  multiline={isTextArea}
                  numberOfLines={isTextArea ? 9 : 1}
                  textAlignVertical={isTextArea ? "top" : "center"}
                  accessibilityLabel={label || name}
                  accessibilityHint={error ? error.message : undefined}
                  accessibilityRole="text"
                  {...props}
                />
                {secureTextEntry && (
                  <TouchableOpacity
                    onPress={() => setShowIsValueHidden(!isValueHidden)}
                    accessibilityLabel={isValueHidden ? "Show password" : "Hide password"}
                    accessibilityRole="button"
                  >
                    {isValueHidden ? (
                      <Eye color="#D0D0D0" width={20} height={20} />
                    ) : (
                      <EyeOff color="#D0D0D0" width={20} height={20} />
                    )}
                  </TouchableOpacity>
                )}
                {onClear && props.value && (
                  <TouchableOpacity onPress={onClear} accessibilityLabel="Clear input" accessibilityRole="button">
                    <X color="#D0D0D0" width={24} height={24} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {error && <Text className="text-red-500">{error.message}</Text>}
          </View>
        );
      }}
    />
  );
};

export default CustomInput;
