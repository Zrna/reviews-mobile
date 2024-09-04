import { Stack } from "expo-router";

import { useAuthContext } from "@/contexts/AuthContext";

export const AuthNavigator = () => {
  const { authState } = useAuthContext();

  if (authState.isLoggedIn) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)/(tabs)" />
        <Stack.Screen name="(protected)/reviews/[id]" />
      </Stack>
    );
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
      </Stack>
    );
  }
};
