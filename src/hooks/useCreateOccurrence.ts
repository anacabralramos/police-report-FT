import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OccurrenceForm } from "../types";
import { uploadPhotos } from "./utils";
import { supabase } from "../lib";

export interface CreateOccurrencePayload extends OccurrenceForm {
  criado_por: string;
}

export function useCreateOccurrence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOccurrencePayload) => {
      // 1. FAZER O UPLOAD DAS FOTOS PRIMEIRO
      // Isso transforma ['file://...'] em ['caminho/no/storage.jpg']
      let remotePhotoPaths: string[] = [];
      if (payload.fotos.length > 0) {
        remotePhotoPaths = await uploadPhotos(
          payload.fotos,
          payload.criado_por
        );
      }

      // 2. INSERIR A OCORRÊNCIA (com os caminhos das fotos do storage)
      const { data: occurrence, error: occError } = await supabase
        .from("ocorrencias")
        .insert([
          {
            titulo: payload.titulo,
            descricao: payload.descricao,
            localizacao: payload.localizacao,
            data_hora: payload.data_hora,
            fotos: remotePhotoPaths, // Agora são os caminhos remotos
            criado_por: payload.criado_por,
          },
        ])
        .select()
        .single();

      if (occError) throw occError;

      // 3. INSERIR OS VÍNCULOS
      if (payload.envolvidos && payload.envolvidos.length > 0) {
        const involvedData = payload.envolvidos.map((pessoa) => ({
          ocorrencia_id: occurrence.id,
          pessoa_id: pessoa.id, // Extraindo o ID do objeto
        }));

        const { error: invError } = await supabase
          .from("ocorrencia_envolvidos")
          .insert(involvedData);

        if (invError) throw invError;
      }

      return occurrence;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["occurrences"] });
    },
  });
}
