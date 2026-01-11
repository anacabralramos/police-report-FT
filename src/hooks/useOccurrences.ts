import { useQuery } from "@tanstack/react-query";

import { OccurrenceFilter } from "../types";
import { supabase } from "../lib";

// export function useOccurrences() {
//   return useQuery({
//     queryKey: ["occurrences"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("ocorrencias")
//         .select(
//           `
//     *,
//     ocorrencia_envolvidos (
//       pessoa_id,
//       pessoas (
//         nome
//       )
//     )
//   `
//         )
//         .order("created_at", { ascending: false });

//       if (error) throw error;
//       return data;
//     },
//   });
// }
export function useOccurrences(filters: {
  option: OccurrenceFilter | null;
  text: string;
  date: Date;
}) {
  return useQuery({
    queryKey: ["occurrences", filters],
    queryFn: async () => {
      // 1. Iniciamos a query base
      let query = supabase.from("ocorrencias").select(`
          *,
          ocorrencia_envolvidos (
            pessoa_id,
            pessoas ( nome )
          )
        `);

      // 2. Aplicamos filtros condicionais baseados na escolha do usuário
      if (filters.option === "TITLE" && filters.text) {
        // Busca parcial insensível a maiúsculas/minúsculas
        query = query.ilike("titulo", `%${filters.text}%`);
      }

      if (filters.option === "DATE") {
        const start = new Date(filters.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filters.date);
        end.setHours(23, 59, 59, 999);

        query = query
          .gte("data_hora", start.toISOString())
          .lte("data_hora", end.toISOString());
      }

      // Adicionando o novo filtro de Localização que você mencionou
      if (filters.option === "LOCATION" && filters.text) {
        query = query.ilike("localizacao", `%${filters.text}%`);
      }

      // 3. Executamos com a ordenação final
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data;
    },
    // Mantém a lista atual visível enquanto busca a nova (UX fluida)
    placeholderData: (previousData) => previousData,
    // Evita que o app refaça a busca se o policial apenas minimizar o app por 10 segundos
    staleTime: 1000 * 60 * 5,
  });
}
// src/hooks/useOccurrences.ts
// export function useOccurrences(searchTerm: string, dateFilter: Date | null) {
//   return useQuery({
//     queryKey: ["occurrences", searchTerm, dateFilter?.toISOString()],
//     queryFn: async () => {
//       let query = supabase.from("ocorrencias").select(`
//           *,
//           ocorrencia_envolvidos (
//             pessoas ( nome )
//           )
//         `);

//       // 1. Filtro de Texto (Título ou Localização)
//       if (searchTerm) {
//         query = query.or(
//           `titulo.ilike.%${searchTerm}%,localizacao.ilike.%${searchTerm}%`
//         );
//         // Nota: Filtrar pelo nome do envolvido no select complexo
//         // requer rpc ou filtros avançados. Por hora, focamos em titulo/local.
//       }

//       // 2. Filtro de Data
//       if (dateFilter) {
//         const startOfDay = new Date(dateFilter).setHours(0, 0, 0, 0);
//         const endOfDay = new Date(dateFilter).setHours(23, 59, 59, 999);
//         query = query
//           .gte("data_hora", new Date(startOfDay).toISOString())
//           .lte("data_hora", new Date(endOfDay).toISOString());
//       }

//       const { data, error } = await query.order("created_at", {
//         ascending: false,
//       });
//       if (error) throw error;
//       return data;
//     },
//   });
// }
