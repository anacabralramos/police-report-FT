import { useInfiniteQuery } from "@tanstack/react-query";
import { OccurrenceFilter } from "@types";

import { supabase } from "../lib";

const PAGE_SIZE = 20;

interface UseOccurrencesProps {
  option: OccurrenceFilter | null;
  text: string;
  date: Date;
}

export function useOccurrences({ option, text, date }: UseOccurrencesProps) {
  // 1. Lógicas de validação para habilitar a busca
  const cleanText = text.trim();
  const isTextSearch = option === "TITLE" || option === "INVOLVED";
  const hasMinChars = cleanText.length >= 3;

  // A query deve rodar se:
  // - Não houver filtro (lista geral)
  // - O filtro for data (sempre habilitado)
  // - O filtro for texto e tiver 3+ caracteres
  const isEnabled =
    !option || option === "DATE" || (isTextSearch && hasMinChars);

  return useInfiniteQuery({
    queryKey: ["occurrences", option, text, date],
    initialPageParam: 0,
    enabled: isEnabled,
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      // 1. Apontamos para a VIEW
      let query = supabase.from("ocorrencias_com_envolvidos").select("*");

      // 2. Filtro por TÍTULO (na própria ocorrência)
      if (option === "TITLE" && hasMinChars) {
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
      if (option === "INVOLVED" && hasMinChars) {
        const cleanDigits = text.replace(/\D/g, "");
        const isNumeric =
          cleanDigits.length >= 3 && /^\d+$/.test(text.replace(/[.-]/g, ""));

        if (isNumeric) {
          query = query.ilike("envolvidos_cpfs", `%${cleanDigits}%`);
        } else {
          query = query.ilike("envolvidos_nomes", `%${cleanText}%`);
        }
      }

      // 5. Ordenação e Limite
      const { data, error } = await query
        .order("data_hora", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  });
}
