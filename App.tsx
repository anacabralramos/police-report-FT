import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./src/navigation";
import { supabase } from "./src/lib";
import { useAuthStore } from "./src/store/authStore";

export default function App() {
  const queryClient = new QueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Verifica se já existe uma sessão salva ao abrir o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });

    // Escuta mudanças (Login/Logout) em tempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
