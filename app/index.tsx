import { Link, Redirect, router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "@/assets/images/logo.png";
import bg from "@/assets/images/sign-in-background.png";
import CustomButton from "@/components/CustomButton";
import { useAuthContext } from "@/contexts/AuthContext";

const App = () => {
  const { authState, onGoogleLogin } = useAuthContext();

  if (authState.isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="items-center">
        <Image source={logo} className="w-[130px] h-[50px] mt-4 z-10" resizeMode="contain" />
        <View className="relative flex items-center justify-center w-full h-full px-4 gap-8">
          <Image source={bg} className="absolute opacity-30" />
          <View className="gap-6">
            <Text className="text-6xl text-white font-pop-bold">A diary for everything you watch.</Text>
            <Text className="text-dimmed text-lg font-pop-regular">
              You just finished it. Was it any good? Write it down now, before the next thing buries it.
            </Text>
          </View>
          <View className="gap-4 w-full items-center">
            <CustomButton
              variant="outlined"
              text="Continue with Google"
              isFullWidth
              onPress={() => onGoogleLogin?.()}
            />
            <CustomButton
              variant="outlined"
              text="Continue with Email"
              isFullWidth
              onPress={() => router.push("/login")}
            />
            <Link href="/register" className="text-dimmed">
              or Create an account
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
