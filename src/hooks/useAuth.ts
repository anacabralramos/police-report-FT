import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "../store/authStore";
import { supabase } from "../lib";

export function useSignIn() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async ({ email, password }: any) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user); // Guarda o policial logado no Zustand
    },
    onError: (error) => {
      alert("Falha no login: " + error.message);
    },
  });
}
