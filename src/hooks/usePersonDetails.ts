import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib";

export function usePersonDetails(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pessoas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    // Aqui está o "pulo do gato":
    initialData: () => {
      // Tentamos encontrar essa pessoa no cache de qualquer busca anterior
      // Nota: o getQueriesData (no plural) busca em todas as variações da chave 'people'
      const allPeopleCaches = queryClient.getQueriesData({
        queryKey: ["people"],
      });

      for (const [key, data] of allPeopleCaches) {
        if (Array.isArray(data)) {
          const found = data.find((p) => p.id === id);
          if (found) return found;
        }
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // Considera o dado "fresco" por 5 minutos
  });
}
