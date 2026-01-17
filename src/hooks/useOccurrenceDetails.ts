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
              id,
              nome,
              cpf,
            )
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      const cpfs: string[] = [];
      const ids: string[] = [];
      const nomes: string[] = [];

      data.ocorrencia_envolvidos.forEach((item) => {
        cpfs.push(item.pessoas.cpf);
        nomes.push(item.pessoas.nome);
        ids.push(item.pessoas.id);
      });
      const envolvidos_cpfs = cpfs.join(" | ");
      const envolvidos_nomes = nomes.join(" | ");
      const envolvidos_ids = ids.join(" | ");

      return {
        created_at: data.created_at,
        data_hora: data.data_hora,
        descricao: data.descricao,
        id: data.id,
        localizacao: data.localizacao,
        titulo: data.titulo,
        envolvidos_cpfs,
        envolvidos_ids,
        envolvidos_nomes,
      };
    },

    initialData: () => {
      const allOccurrencesCaches = queryClient.getQueriesData({
        queryKey: ["occurrences"],
      });

      for (const [_, cacheData] of allOccurrencesCaches) {
        // Se vier do useInfiniteQuery, o formato é { pages: [...], pageParams: [...] }
        if (
          cacheData &&
          typeof cacheData === "object" &&
          "pages" in cacheData
        ) {
          for (const page of (cacheData as any).pages) {
            const found = page.find((occ: any) => occ.id === id);
            if (found) return found;
          }
        }
      }
      return undefined;
    },
    staleTime: Infinity, // Considera o dado do cache "sempre novo" nesta sessão
    gcTime: 1000 * 60 * 30, // Mantém o cache por 30 minutos
  });
}
