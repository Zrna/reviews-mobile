import "../global.css";
import "../nativewind.setup";
import "@/services/googleAuth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ToastManager from "toastify-react-native";

import AuthProvider from "@/contexts/AuthContext";

import AuthNavigator from "./AuthNavigator";

SystemUI.setBackgroundColorAsync("black");

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

const TOAST_ICONS: Record<string, string> = {
  success: "checkmark-circle",
  error: "alert-circle",
  info: "information-circle",
  warn: "warning",
  default: "checkmark-circle",
};

const TOAST_COLORS: Record<string, string> = {
  success: "#23C06B",
  error: "#C02323",
  info: "#3498db",
  warn: "#C09423",
  default: "#3498db",
};

// `text1` needs to be named as such to work with the ToastManager's default configuration, which expects a `text1` property for the main message.
const renderToast = ({ type = "default", text1 }: { type?: string; text1?: string }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#202020",
      borderRadius: 15,
      minHeight: 45,
      paddingHorizontal: 16,
    }}
  >
    <Ionicons name={TOAST_ICONS[type]} size={22} color={TOAST_COLORS[type]} style={{ marginRight: 8 }} />
    <Text style={{ color: "#fff", fontFamily: "Poppins-Regular", fontSize: 14 }}>{text1}</Text>
  </View>
);

const toastConfig = {
  success: renderToast,
  error: renderToast,
  info: renderToast,
  warn: renderToast,
  default: renderToast,
};

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
        <ToastManager duration={2500} config={toastConfig} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
