import { Stack } from "expo-router";

import { useAuthContext } from "@/contexts/AuthContext";

export const AuthNavigator = () => {
  const { authState } = useAuthContext();
  console.log(authState);

  if (authState.isLoggedIn) {
    console.log("logged in stack");
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)" />
      </Stack>
    );
  } else {
    console.log("logged out stack");
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
      </Stack>
    );
  }
};
