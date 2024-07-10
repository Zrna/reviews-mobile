import { Link, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "@/assets/images/logo.png";
import bg from "@/assets/images/sign-in-background.png";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center">
          <Image source={logo} className="w-[130px] h-[50px] mt-4" resizeMode="contain" />
          <View className="relative flex items-center justify-center w-full h-[80vh] px-6">
            <Image source={bg} className="absolute opacity-30" />
            <View className="z-10 gap-10 py-6">
              <Text className="text-3xl text-white font-pop-bold text-center">
                Simplify your entertainment with <Text className="text-primary text-4xl">moovier</Text>
              </Text>
              <Text className="text-dimmed text-sm font-pop-regular text-center">
                Keep all your ratings in one place. Save your thoughts, get new recommendations, and more.
              </Text>
            </View>
            <CustomButton text="Continue to Login" isFullWidth onPress={() => router.push("/login")} />
            <Link href="/register" className="text-dimmed mt-6">
              or create an account
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
