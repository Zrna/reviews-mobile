import { router, useNavigation } from "expo-router";
import React from "react";
import { Animated, Platform, TouchableOpacity, View } from "react-native";
import { ArrowLeftCircle, Check, Edit2, Search, Trash2, X } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

interface IconWrapperProps {
  onPress: () => void;
  children: any;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ onPress, children }) => (
  <TouchableOpacity className="w-8 h-10 ml-1 items-center justify-center" onPress={onPress}>
    {children}
  </TouchableOpacity>
);

interface NavbarProps {
  bgColor?: Animated.AnimatedInterpolation<string | number>;
  isEditMode: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ bgColor, isEditMode, onEdit, onSave, onCancel, onDelete }) => {
  const navigation = useNavigation();

  const isAndroid = Platform.OS === "android";

  return (
    <Animated.View
      className="w-full absolute z-10"
      style={{
        height: isAndroid ? (isEditMode ? 90 : 95) : 115,
        backgroundColor: isEditMode ? "rgba(0, 0, 0, 0.5)" : bgColor,
      }}
    >
      <SafeAreaView className="flex-row px-3 justify-between items-center top-3 w-full">
        {isEditMode ? (
          <>
            <IconWrapper onPress={onDelete}>
              <Trash2 stroke="red" width={26} height={26} />
            </IconWrapper>
            <View className="flex-row">
              <IconWrapper onPress={onCancel}>
                <X stroke="rgba(255,255,255,0.8)" width={28} height={28} />
              </IconWrapper>
              <IconWrapper onPress={onSave}>
                <Check stroke="rgb(255,255,255)" width={28} height={28} />
              </IconWrapper>
            </View>
          </>
        ) : (
          <>
            <ArrowLeftCircle
              stroke="rgba(255,255,255,0.7)"
              width={38}
              height={38}
              onPress={() => navigation.goBack()}
            />
            <View className="flex-row space-x-3">
              <IconWrapper onPress={() => router.push("/search/[query]")}>
                <Search stroke="rgba(255,255,255,0.7)" width={24} height={24} />
              </IconWrapper>
              <IconWrapper onPress={onEdit}>
                <Edit2 stroke="rgba(255,255,255,0.7)" width={24} height={24} />
              </IconWrapper>
            </View>
          </>
        )}
      </SafeAreaView>
    </Animated.View>
  );
};

export default Navbar;
