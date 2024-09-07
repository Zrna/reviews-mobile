import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { LogOut } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "@/hooks/api/account";
import { getUserInitials } from "@/utils/user";

const Profile = () => {
  const { onLogout } = useAuthContext();
  const { data: account, isLoading: isLoadingUser } = useAccount();

  if (!account || isLoadingUser) {
    return (
      <SafeAreaView className="h-full justify-center bg-black">
        <ActivityIndicator color="white" />

        {/* Use this box to logout when the app is stuck */}
        <Text className="w-10 h-10 self-center" onPress={onLogout} />
      </SafeAreaView>
    );
  }

  const { email, firstName, lastName } = account;
  const userInitials = getUserInitials(firstName, lastName);

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="pt-4 px-3 items-end">
        <LogOut stroke="rgba(255,255,255,0.8)" width={28} height={28} onPress={onLogout} />
      </View>
      <View className="h-full justify-center items-center space-y-6">
        <View className="bg-green-default rounded-lg p-0.5">
          <View className="w-16 h-16 border-2 border-black rounded-lg justify-center items-center bg-black">
            <Text className="text-2xl text-white">{userInitials}</Text>
          </View>
        </View>
        <Text className="text-white text-xl">
          {firstName} {lastName}
        </Text>
        <Text className="text-white text-xl">{email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
