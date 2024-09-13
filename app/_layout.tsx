import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import ToastManager from "toastify-react-native";

import { AuthProvider } from "@/contexts/AuthContext";

import { AuthNavigator } from "./AuthNavigator";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds
    },
  },
});

const RootLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsError) {
      throw fontsError;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded || (!fontsLoaded && !fontsError)) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthNavigator />
        <StatusBar backgroundColor="#000" style="light" />
        <ToastManager
          animationInTiming={600}
          animationOutTiming={600}
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          duration={2000}
          width={170}
          height={45}
          showCloseIcon={false}
          showProgressBar={false}
          theme="light"
          style={{ backgroundColor: "#202020", borderRadius: 50 }}
          textStyle={{ color: "#fff", fontFamily: "Poppins-Regular", fontSize: 14 }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
