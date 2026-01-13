import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { CreateOccurrencePayload, useCreateOccurrence } from "@hooks";
import { useAuthStore, useOccurrenceStore } from "@store";
import { useAppNavigation } from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import { OccurrenceForm } from "@types";
import {
  Wrapper,
  DatePicker,
  InvolvedInLinking,
  PhotoUploader,
  TitleDropdown,
} from "@components";

import { initialFormState } from "./constants";
import { styles } from "./styles";

export default function NewOccurrence() {
  const navigation = useAppNavigation();
  const { user } = useAuthStore();

  const involved = useOccurrenceStore((state) => state.selectedPeople);
  const removePerson = useOccurrenceStore((state) => state.removePerson);
  const clearInvolved = useOccurrenceStore(
    (state) => state.clearOccurrenceDraft
  );

  const { mutate: createOccurrenceMutate, isPending } = useCreateOccurrence();

  const [formOccurrence, setFormOccurrence] =
    useState<OccurrenceForm>(initialFormState);

  const updateField = (field: keyof OccurrenceForm, value: any) => {
    setFormOccurrence((prev) => ({ ...prev, [field]: value }));
  };

  const removeImage = (uriToRemove: string) => {
    setFormOccurrence((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((uri) => uri !== uriToRemove),
    }));
  };

  const handleSave = async () => {
    const payload: CreateOccurrencePayload = {
      ...formOccurrence,
      envolvidos: involved,
      criado_por: user?.id,
    };

    createOccurrenceMutate(payload, {
      onSuccess: () => {
        // 1. Popup de Sucesso
        Alert.alert(
          "Sucesso!",
          "A ocorrência foi registrada e os envolvidos foram vinculados.",
          [{ text: "OK" }]
        );

        // 2. Resetar o formulário local (campos de texto e fotos)
        setFormOccurrence(initialFormState);

        // 3. Limpar os envolvidos do Zustand
        clearInvolved();
      },
      onError: (error: any) => {
        Alert.alert(
          "Erro ao salvar",
          error.message || "Ocorreu um erro inesperado."
        );
      },
    });
  };

  return (
    <Wrapper title="Novo cadastro" useScroll>
      {/* Seção de Fotos */}
      <PhotoUploader
        images={formOccurrence.fotos}
        removeImage={removeImage}
        updateForm={updateField}
      />

      {/* Lista de Envolvidos Selecionados */}
      <InvolvedInLinking involved={involved} onDelete={removePerson} />

      {/* Botão de Envolvidos */}
      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary, { opacity: 0.6 }]}
        onPress={() => navigation.navigate("LinkThoseInvolved")}
      >
        <Ionicons
          name="person-add"
          size={20}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.buttonText}>Vincular Envolvidos</Text>
      </TouchableOpacity>

      {/* Campo de titulo */}
      <TitleDropdown title={formOccurrence.titulo} updateForm={updateField} />

      {/* Campo Localização */}
      <Text style={styles.label}>Local da Abordagem</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="location"
          size={20}
          color="#1d4ed8"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Ex: Av. Principal, 123 - Centro"
          placeholderTextColor="#666"
          value={formOccurrence.localizacao}
          onChangeText={(text) => updateField("localizacao", text)}
        />
      </View>

      <DatePicker
        label="Data e Hora"
        date={formOccurrence.data_hora}
        onChange={(date) => updateField("data_hora", date)}
      />

      {/* Campo Descrição */}
      <Text style={styles.label}>Relato da Ocorrência</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva detalhadamente os fatos..."
        placeholderTextColor="#666"
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        value={formOccurrence.descricao}
        onChangeText={(text) => updateField("descricao", text)}
      />

      {/* Botão Salvar (Final) */}
      <TouchableOpacity
        style={[styles.buttonMain, isPending && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={isPending}
      >
        {isPending ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>SALVANDO...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>SALVAR OCORRÊNCIA</Text>
        )}
      </TouchableOpacity>
    </Wrapper>
  );
}
