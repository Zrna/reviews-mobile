import { router, Tabs } from "expo-router";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import { Home, Plus, Search } from "react-native-feather";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BackButton } from "@/components";
import { BottomSheetControls } from "@/components/BottomSheet";
import { CreateReviewBottomSheet } from "@/components/screens/create/CreateReviewBottomSheet";
import { BOTTOM_NAVBAR_HEIGHT } from "@/constants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "@/hooks/api/account";
import { getUserInitials } from "@/utils/user";

interface TabIconProps {
  color: string;
  IconComponent: React.FC<{
    stroke: string;
    width: number;
    height: number;
    strokeWidth: number;
  }>;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ color, IconComponent, focused }) => {
  return <IconComponent stroke={color} strokeWidth={focused ? 3 : 2} width={24} height={24} />;
};

const ProtectedLayout = () => {
  const { authState } = useAuthContext();
  const { data: account } = useAccount({ enabled: authState.isLoggedIn });
  const bottomSheetRef = useRef<BottomSheetControls>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenListeners={({ route }) => ({
          tabPress: () => {
            if (route.name !== "create") {
              bottomSheetRef.current?.close();
            }
          },
        })}
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: "#0E0E0E",
          tabBarInactiveBackgroundColor: "#0E0E0E",
          tabBarInactiveTintColor: "#d9d9d9",
          tabBarActiveTintColor: "white",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
            marginBottom: 0,
            marginTop: 2,
          },
          tabBarStyle: {
            backgroundColor: "#0E0E0E",
            borderTopWidth: 0.2,
            borderTopColor: "#A1A1A1",
            height: BOTTOM_NAVBAR_HEIGHT,
            paddingBottom: 4,
            paddingTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 0,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} IconComponent={Home} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: true,
            headerTitle: "",
            headerStyle: {
              backgroundColor: "black",
            },
            headerLeft: () => <BackButton />,
            tabBarIcon: ({ focused, color }) => <TabIcon color={color} focused={focused} IconComponent={Search} />,
          }}
        />
        <Tabs.Screen
          name="create"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              if (bottomSheetRef.current?.isOpen()) {
                bottomSheetRef.current.close();
              } else {
                bottomSheetRef.current?.open();
              }
            },
          }}
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => <TabIcon color={color} focused={focused} IconComponent={Plus} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: focused ? "#00C774" : "#333",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {account ? getUserInitials(account.firstName, account.lastName) : ""}
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
      <CreateReviewBottomSheet
        onReady={(controls) => {
          bottomSheetRef.current = controls;
        }}
        onSelect={(mediaType) => {
          router.push({
            pathname: "/create",
            params: {
              mediaType,
            },
          });
        }}
      />
    </GestureHandlerRootView>
  );
};

export default ProtectedLayout;
