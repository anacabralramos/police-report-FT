import { useQuery } from "@tanstack/react-query";
import { OccurrenceFilter } from "@types";

import { supabase } from "../lib";

interface UseOccurrencesProps {
  option: OccurrenceFilter | null;
  text: string;
  date: Date;
}

export function useOccurrences({ option, text, date }: UseOccurrencesProps) {
  return useQuery({
    queryKey: ["occurrences", option, text, date],
    queryFn: async () => {
      // 1. Apontamos para a nossa nova VIEW
      let query = supabase.from("ocorrencias_com_envolvidos").select("*");

      console.log({ option, date });
      // 2. Filtro por TÍTULO (na própria ocorrência)
      if (option === "TITLE" && text) {
        query = query.ilike("titulo", `%${text}%`);
      }

      // 3. Filtro por DATA
      if (option === "DATE" && date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        query = query
          .gte("data_hora", start.toISOString())
          .lte("data_hora", end.toISOString());
      }

      // 4. Filtro por ENVOLVIDO (usando as colunas agregadas da View)
      if (option === "INVOLVED" && text) {
        const cleanText = text.replace(/\D/g, "");
        const isNumeric = cleanText.length > 0 && /^\d+$/.test(cleanText);

        if (isNumeric) {
          // Busca o CPF dentro da string de CPFs agregados (ex: "123... | 456...")
          query = query.ilike("envolvidos_cpfs", `%${cleanText}%`);
        } else {
          // Busca o nome dentro da string de nomes agregados
          query = query.ilike("envolvidos_nomes", `%${text}%`);
        }
      }

      // 5. Ordenação e Limite
      const { data, error } = await query
        // .order("created_at", { ascending: false })
        .order("data_hora", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
    // Mantém a lista anterior enquanto carrega a nova busca (UX fluida)
    placeholderData: (previousData) => previousData,
    // Evita refetch desnecessário se o policial voltar na tela rápido
    staleTime: 1000 * 60 * 2,
  });
}
