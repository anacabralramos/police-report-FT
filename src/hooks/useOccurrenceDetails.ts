import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib";

export function useOccurrenceDetails(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["occurrence", id],
    queryFn: async () => {
      // Mesmo que já tenhamos os dados, é bom fazer o fetch para garantir
      // que pegamos a versão mais atualizada (caso outro policial tenha editado)
      const { data, error } = await supabase
        .from("ocorrencias")
        .select(
          `
          *,
          ocorrencia_envolvidos (
            pessoa_id,
            pessoas ( 
              nome,
              cpf 
            )
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },

    initialData: () => {
      // Buscamos em todas as queries que começam com "occurrences"
      // (inclusive as que têm filtros como queryKey: ["occurrences", {text: '...'}])
      const allOccurrencesCaches = queryClient.getQueriesData<any[]>({
        queryKey: ["occurrences"],
      });

      for (const [_, data] of allOccurrencesCaches) {
        if (Array.isArray(data)) {
          const found = data.find((occ) => occ.id === id);
          if (found) return found;
        }
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de dados "frescos"
  });
}
