import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ícones já vêm no Expo
import {
  NewOccurrenceScreen,
  SearchOccurrenceScreen,
  SearchPersonScreen,
} from "..";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
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
          height: Platform.OS === "ios" ? 88 : 65, // Aumentamos a altura
          paddingBottom: Platform.OS === "ios" ? 30 : 10, // Padding para iOS respeitar a barra
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: { color: "#fff", fontSize: 18 },
});
