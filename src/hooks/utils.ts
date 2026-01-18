// import * as FileSystem from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";

export const uploadPhotos = async (photos: string[], userId: string) => {
  const uploadedUrls: string[] = [];

  for (const uri of photos) {
    // 1. Gerar um nome único para o arquivo
    const fileExt = uri.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    try {
      // 2. Ler o arquivo como base64 (Solução para o erro de EncodingType)
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64" as any,
      });

      // 3. Fazer o upload para o Supabase
      const { data, error } = await supabase.storage
        .from("fotos_ocorrencias") // certifique-se que o nome do bucket está igual no Supabase
        .upload(fileName, decode(base64), {
          contentType: `image/${fileExt === "png" ? "png" : "jpeg"}`,
          upsert: true,
        });

      if (error) throw error;
      if (data) uploadedUrls.push(data.path);
    } catch (err) {
      console.error("Erro no upload de uma imagem:", err);
      throw err; // Repassa o erro para o mutation tratar
    }
  }

  return uploadedUrls;
};

// Dentro do seu componente ou em um helper
export const getImageUrl = (path: string) => {
  const { data } = supabase.storage
    .from("fotos_ocorrencias")
    .getPublicUrl(path);

  return data.publicUrl;
};

export const getRawPath = (url: string) => {
  // Se não for uma string ou não for uma URL (já é um path ou arquivo local), retorna como está
  if (typeof url !== "string" || !url.startsWith("http")) {
    return url;
  }

  const bucketName = "fotos_ocorrencias";

  // A URL do Supabase segue o padrão: .../storage/v1/object/public/NOME_DO_BUCKET/PATH_DO_ARQUIVO
  // Dividimos a string a partir do nome do bucket
  const parts = url.split(`${bucketName}/`);

  // Se a divisão funcionou, a segunda parte (índice 1) é o seu path original
  if (parts.length > 1) {
    return parts[1];
  }

  return url;
};
