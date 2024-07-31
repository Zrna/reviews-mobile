import { Link, Stack } from "expo-router";
import { Search } from "react-native-feather";

import { useAuthContext } from "@/contexts/AuthContext";

export const AuthNavigator = () => {
  const { authState } = useAuthContext();

  if (authState.isLoggedIn) {
    return (
      <Stack>
        <Stack.Screen name="(protected)/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(protected)/review/[id]"
          options={{
            title: "",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerRight: (props) => (
              <Link href="search/[query]">
                <Search stroke={props.tintColor} width={20} height={20} />
              </Link>
            ),
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
