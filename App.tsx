import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
