import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StorageProvider, useStorage } from "./src/storage/StorageContext";
import HomeScreen from "./src/screens/HomeScreen";
import RoutineScreen from "./src/screens/RoutineScreen";
import MealsScreen from "./src/screens/MealsScreen";
import WaterScreen from "./src/screens/WaterScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { COLORS } from "./src/theme";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { ready } = useStorage();

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.cream, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.yellow} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.brown,
          tabBarInactiveTintColor: "#A8A093",
          tabBarStyle: {
            height: 72,
            paddingTop: 7,
            paddingBottom: 10,
            backgroundColor: COLORS.card,
            borderTopColor: COLORS.border
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600" }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <TabIcon text="⌂" /> }} />
        <Tab.Screen name="Routine" component={RoutineScreen} options={{ tabBarIcon: () => <TabIcon text="✦" /> }} />
        <Tab.Screen name="Meals" component={MealsScreen} options={{ tabBarIcon: () => <TabIcon text="◒" /> }} />
        <Tab.Screen name="Water" component={WaterScreen} options={{ tabBarIcon: () => <TabIcon text="◌" /> }} />
        <Tab.Screen name="Progress" component={ProgressScreen} options={{ tabBarIcon: () => <TabIcon text="▥" /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <TabIcon text="○" /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function TabIcon({ text }) {
  return <View style={{ width: 22, height: 22, alignItems: "center", justifyContent: "center" }}><View><TextIcon text={text} /></View></View>;
}

function TextIcon({ text }) {
  const ReactNativeText = require("react-native").Text;
  return <ReactNativeText style={{ fontSize: 20, color: COLORS.brown }}>{text}</ReactNativeText>;
}

export default function App() {
  return (
    <StorageProvider>
      <AppNavigator />
    </StorageProvider>
  );
}