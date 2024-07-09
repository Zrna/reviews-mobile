import { Tabs } from "expo-router";
import React from "react";

const ProtectedLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
        tabBarInactiveTintColor: "#A1A1A1",
        tabBarActiveTintColor: "white",
        // tabBarShowLabel: false, // show or hide the tab labels
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0.2,
          borderTopColor: "#A1A1A1",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search/[query]"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;
