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
        `
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
