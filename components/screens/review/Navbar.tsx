import { Link, useNavigation } from "expo-router";
import React from "react";
import { Animated, Platform, View } from "react-native";
import { ArrowLeftCircle, Edit2, Save, Search, Trash2, X } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

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
            <Trash2 stroke="red" width={26} height={26} onPress={onDelete} />
            <View className="flex-row space-x-3">
              <Save stroke="rgba(255,255,255,0.7)" width={28} height={28} onPress={onSave} />
              <X stroke="rgba(255,255,255,0.7)" width={28} height={28} onPress={onCancel} />
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
              <Link href="search/[query]">
                <Search stroke="rgba(255,255,255,0.7)" width={24} height={24} />
              </Link>
              <Edit2 stroke="rgba(255,255,255,0.7)" width={24} height={24} onPress={onEdit} />
            </View>
          </>
        )}
      </SafeAreaView>
    </Animated.View>
  );
};

export default Navbar;
