import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib";

export function useOccurrences() {
  return useQuery({
    queryKey: ["occurrences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ocorrencias")
        .select(
          `
          *,
          pessoas ( nome ) 
        `
        ) // Isso aqui já traz o nome do envolvido automaticamente!
        .order("data_ocorrencia", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
