import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib";

export function usePeople(searchTerm: string) {
  return useQuery({
    queryKey: ["people", searchTerm],
    queryFn: async () => {
      // Se não tiver busca e você não quiser listar todos de cara:
      if (searchTerm.length < 3) return [];

      const { data, error } = await supabase.rpc("buscar_pessoa_sem_acento", {
        termo_busca: searchTerm,
      });

      if (error) throw error;
      return data;
    },
    // Opcional: mantém os dados da busca anterior enquanto carrega a nova
    placeholderData: (previousData) => previousData,
  });
}
