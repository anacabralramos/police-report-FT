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
    ocorrencia_envolvidos (
      pessoa_id,
      pessoas (
        nome
      )
    )
  `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
