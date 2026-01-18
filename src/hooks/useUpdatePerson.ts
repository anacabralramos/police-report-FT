import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getImageUrl, getRawPath, uploadPhotos } from "@hooks";
import { PersonData } from "@types";

import { supabase } from "../lib";

export interface UpdatePersonPayload extends PersonData {
  criado_por: string;
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (person: UpdatePersonPayload) => {
      const newPhotos = person.fotos.filter((p) => p.startsWith("file://"));
      const existingPhotos = person.fotos.filter(
        (p) => !p.startsWith("file://"),
      );

      const cleanedExisting = existingPhotos.map((p) => getRawPath(p));

      // 1. FAZER O UPLOAD DAS FOTOS PRIMEIRO
      // Isso transforma ['file://...'] em ['caminho/no/storage.jpg']
      let remotePhotoPaths: string[] = [];
      if (newPhotos.length > 0) {
        remotePhotoPaths = await uploadPhotos(newPhotos, person.criado_por);
      }

      const { data, error } = await supabase
        .from("pessoas")
        .update({
          nome: person.nome,
          cpf: person.cpf.replace(/\D/g, ""),
          rg: person.rg.replace(/[^0-9Xx]/g, ""),
          data_nascimento: person.data_nascimento,
          endereco: person.endereco,
          fotos: [...cleanedExisting, ...remotePhotoPaths],
        })
        .eq("id", person.id)
        .select()
        .single();

      if (error) throw error;
      return {
        ...data,
        fotos: data.fotos?.map((foto: string) => getImageUrl(foto)) || [],
      };
    },
    onSuccess: (data) => {
      // 1. Atualiza o cache da pessoa individual (faz a tela de detalhes atualizar na hora)
      queryClient.setQueryData(["person", data.id], data);

      // 2. Avisa que a lista de pessoas mudou
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
    onError: (error: any) => {
      console.log({ error });
      Alert.alert(
        "Falha na Atualização",
        "Não foi possível salvar as alterações. Verifique sua conexão e tente novamente.",
        [{ text: "OK" }],
      );
    },
  });
}
