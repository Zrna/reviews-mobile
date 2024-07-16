import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components";
import { useAuthContext } from "@/contexts/AuthContext";

const Profile = () => {
  const { onLogout } = useAuthContext();

  return (
    <SafeAreaView className="h-full justify-center items-center bg-black">
      <Text className="text-white">Profile</Text>
      <CustomButton text="Logout" onPress={onLogout} isFullWidth />
    </SafeAreaView>
  );
};

export default Profile;
