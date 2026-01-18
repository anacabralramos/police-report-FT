import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPhotos } from "@hooks";

import { supabase } from "../lib";
import { Person } from "../types";

export interface CreatePersonPayload extends Person {
  criado_por: string;
}

export function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPerson: CreatePersonPayload) => {
      // 1. FAZER O UPLOAD DAS FOTOS PRIMEIRO
      // Isso transforma ['file://...'] em ['caminho/no/storage.jpg']
      let remotePhotoPaths: string[] = [];
      if (newPerson.fotos.length > 0) {
        remotePhotoPaths = await uploadPhotos(
          newPerson.fotos,
          newPerson.criado_por,
        );
      }

      const { data, error } = await supabase
        .from("pessoas")
        .insert([
          {
            nome: newPerson.nome,
            cpf: newPerson.cpf.replace(/\D/g, ""),
            rg: newPerson.rg.replace(/[^0-9Xx]/g, ""),
            data_nascimento: newPerson.data_nascimento,
            endereco: newPerson.endereco,
            fotos: remotePhotoPaths,
          },
        ])
        .select() // Importante para retornar a pessoa com o ID gerado
        .single();

      if (error) {
        // Trata erro de CPF duplicado (comum no banco)
        if (error.code === "23505") {
          throw new Error("Este CPF já está cadastrado no sistema.");
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      // Invalida a busca de pessoas para que o novo cadastro apareça na pesquisa
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
    onError: (error: any) => {
      Alert.alert("Erro ao cadastrar", error.message);
    },
  });
}
