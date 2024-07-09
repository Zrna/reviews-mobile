import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="h-full justify-center items-center bg-black">
      <Text className="text-white">Home</Text>
    </SafeAreaView>
  );
};

export default Home;
