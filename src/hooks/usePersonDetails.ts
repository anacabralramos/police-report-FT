import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageUrl } from "@hooks";
import { supabase } from "../lib";

export function usePersonDetails(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      console.log("Chamada de emergência ao banco para o ID:", id);
      const { data, error } = await supabase
        .from("pessoas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return {
        ...data,
        fotos: data.fotos?.map((foto: string) => getImageUrl(foto)) || [],
      };
    },
    initialData: () => {
      const allPeopleCaches = queryClient.getQueriesData({
        queryKey: ["people"],
      });

      for (const [_, cacheData] of allPeopleCaches) {
        if (
          cacheData &&
          typeof cacheData === "object" &&
          "pages" in cacheData
        ) {
          for (const page of (cacheData as any).pages) {
            const found = page.find((p: any) => p.id === id);
            if (found) return found;
          }
        }
      }
      return undefined;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // Mantém no cache por 1 hora mesmo se não estiver em uso
  });
}
