import { Tabs } from "expo-router";
import React from "react";
import { Home, PlusSquare, Search, User } from "react-native-feather";

import { BackButton } from "@/components";

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
  return <IconComponent stroke={color} strokeWidth={focused ? 3 : 2} width={28} height={28} />;
};

const ProtectedLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#0E0E0E", // theme dark color
        tabBarInactiveBackgroundColor: "#0E0E0E", // theme dark color
        tabBarInactiveTintColor: "#d9d9d9",
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false, // show or hide the tab labels
        tabBarStyle: {
          backgroundColor: "#0E0E0E", // theme dark color
          borderTopWidth: 0.2,
          borderTopColor: "#A1A1A1",
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
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <TabIcon color={color} focused={focused} IconComponent={PlusSquare} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <TabIcon color={color} focused={focused} IconComponent={User} />,
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;
