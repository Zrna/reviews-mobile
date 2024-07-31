import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "@/hooks/api/account";

const Profile = () => {
  const { onLogout } = useAuthContext();
  const { data: account } = useAccount();

  return (
    <SafeAreaView className="h-full justify-center items-center bg-black space-y-5">
      <Text className="text-white">Profile</Text>
      <Text className="text-white text-xl">
        {account?.firstName} {account?.lastName}
      </Text>
      <Text className="text-white text-xl">{account?.email}</Text>
      <CustomButton text="Logout" onPress={onLogout} isFullWidth class="mt-5" />
    </SafeAreaView>
  );
};

export default Profile;
