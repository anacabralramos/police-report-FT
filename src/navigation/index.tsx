import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LinkThoseInvolvedScreen,
  OccurrenceDetailsScreen,
  PersonDetailsScreen,
} from "../screens";
import { useAuthStore } from "../store/authStore";
import { RootStackParamList } from "./types";
import TabNavigator from "./TabNavigator";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const user = useAuthStore((state) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // --- FLUXO AUTENTICADO (Só aparece se user != null) ---
        <>
          <Stack.Screen name="Main" component={TabNavigator} />

          <Stack.Screen
            name="OccurrenceDetails"
            component={OccurrenceDetailsScreen}
            options={{
              headerShown: true,
              title: "Detalhes",
              headerStyle: { backgroundColor: "#101820" },
              headerTintColor: "#fff",
            }}
          />

          <Stack.Screen
            name="PersonDetails"
            component={PersonDetailsScreen}
            options={{
              headerShown: true,
              title: "Perfil do Indivíduo",
              headerStyle: { backgroundColor: "#101820" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="LinkThoseInvolved"
            component={LinkThoseInvolvedScreen}
            options={{
              headerShown: true,
              title: "Vincular indivíduos",
              headerStyle: { backgroundColor: "#101820" },
              headerTintColor: "#fff",
            }}
          />
        </>
      ) : (
        // --- FLUXO DE AUTENTICAÇÃO (Só aparece se user == null) ---
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

export * from "./types";
export * from "./useAppNavigation";
