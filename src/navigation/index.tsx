import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Primeira tela que aparece é o Login */}
      <Stack.Screen name="Login" component={Login} />

      {/* Quando logar, navegamos para o "Main", que contém as Tabs */}
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}
