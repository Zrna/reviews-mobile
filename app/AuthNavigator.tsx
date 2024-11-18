import { Stack } from "expo-router";

import { useAuthContext } from "@/contexts/AuthContext";
import withNetworkCheck from "@/hocs/withNetworkCheck";

const AuthNavigator = () => {
  const { authState } = useAuthContext();

  if (authState.isLoggedIn) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "black" },
        }}
      >
        <Stack.Screen name="(protected)/(tabs)" />
        <Stack.Screen name="(protected)/reviews/[id]" />
        <Stack.Screen
          name="(protected)/reviews/grouped-by-rating/[rating]"
          options={{
            headerShown: true,
            title: "",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },
          }}
        />
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

export default withNetworkCheck(AuthNavigator);
