import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib";

export function usePeople(searchTerm: string, requiredFilter = false) {
  return useQuery({
    queryKey: ["people", searchTerm, requiredFilter],
    queryFn: async () => {
      const cleanTerm = searchTerm.replace(/\D/g, "");
      const isNumeric = cleanTerm.length > 0 && /^\d+$/.test(cleanTerm);

      // Se o filtro for obrigatório e não houver texto suficiente, retorna vazio
      if (requiredFilter && searchTerm.length < 3 && !isNumeric) {
        return [];
      }

      // 1. Busca por CPF
      if (isNumeric) {
        const { data, error } = await supabase
          .from("pessoas")
          .select("*")
          .ilike("cpf", `%${cleanTerm}%`)
          .limit(10);
        if (error) throw error;
        return data;
      }

      // 2. Busca por Nome
      if (searchTerm.length >= 3) {
        const { data, error } = await supabase.rpc("buscar_pessoa_sem_acento", {
          termo_busca: searchTerm,
        });
        if (error) throw error;
        return data;
      }

      // 3. Lista padrão (Só entra aqui se requiredFilter for false)
      const { data, error } = await supabase
        .from("pessoas")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
