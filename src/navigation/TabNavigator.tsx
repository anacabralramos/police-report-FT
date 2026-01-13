import React from "react";
import { Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  NewOccurrenceScreen,
  SearchOccurrenceScreen,
  SearchPersonScreen,
} from "..";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export default function HomeTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#101820" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#1d4ed8",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Nova") iconName = "add-circle";
          else if (route.name === "Ocorrências") iconName = "document-text";
          else if (route.name === "Pessoas") iconName = "people";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: "#101820",
          borderTopColor: "#334155",
          height: Platform.OS === "ios" ? 88 : 70 + insets.bottom,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen
        name="Nova"
        component={NewOccurrenceScreen}
        options={{ title: "Adicionar" }}
      />
      <Tab.Screen name="Ocorrências" component={SearchOccurrenceScreen} />
      <Tab.Screen name="Pessoas" component={SearchPersonScreen} />
    </Tab.Navigator>
  );
}
