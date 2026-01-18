import { useInfiniteQuery } from "@tanstack/react-query";
import { getImageUrl } from "@hooks";
import { supabase } from "../lib";

const PAGE_SIZE = 20;

const formatPerson = (data: any[]) =>
  data?.map((p) => ({
    ...p,
    fotos: p.fotos?.map((foto: string) => getImageUrl(foto)) || [],
  })) || [];

export function usePeople(searchTerm: string) {
  // 1. Definição das regras de negócio (centralizado)
  const cleanCPF = searchTerm.replace(/\D/g, "");
  const cleanName = searchTerm.replace(/[^a-zA-ZÀ-ÿ\s]/g, "").trim();

  const isSearchByCPF =
    cleanCPF.length >= 3 && /^[0-9.\-\s]+$/.test(searchTerm);
  const isSearchByName = !isSearchByCPF && cleanName.length >= 3;
  const isInitialLoad = searchTerm.trim().length === 0;

  return useInfiniteQuery({
    queryKey: ["people", searchTerm],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      // O Supabase usa esse formato .range(de, ate) para buscar fatias específicas da tabela.
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      if (isSearchByCPF) {
        const { data, error } = await supabase
          .from("pessoas")
          .select("*")
          .ilike("cpf", `%${cleanCPF}%`)
          .range(from, to);

        if (error) throw error;
        return formatPerson(data) || [];
      }

      // CASO B: BUSCA POR NOME
      if (isSearchByName) {
        const { data, error } = await supabase.rpc("buscar_pessoa_sem_acento", {
          termo_busca: cleanName,
          p_limit: PAGE_SIZE,
          p_offset: from,
        });

        if (error) throw error;
        return formatPerson(data) || [];
      }

      // CASO C: NENHUM FILTRO (LISTA PADRÃO)
      const { data, error } = await supabase
        .from("pessoas")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return formatPerson(data);
    },
    enabled: isInitialLoad || isSearchByCPF || isSearchByName,
    // Determina se há mais páginas para carregar. Se a última página trouxe menos de 20 pessoas significa que nao tem mais informaçoes pra puxar.
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },
    // Mantem os dados na tela até que os novos dados apareçam.
    placeholderData: (previousData) => previousData,
  });
}
