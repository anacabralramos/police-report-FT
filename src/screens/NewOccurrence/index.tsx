import React, { useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native";

import { CreateOccurrencePayload, useCreateOccurrence } from "@hooks";
import { Wrapper, DatePicker, Input, Typography } from "@components";
import { useAuthStore, useOccurrenceStore } from "@store";
import { OccurrenceForm } from "@types";

import { InvolvedInLinking, Section, TitleDropdown } from "./components";
import { initialFormState } from "./constants";
import { styles } from "./styles";

export default function NewOccurrence() {
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
      <InvolvedInLinking involved={involved} onDelete={removePerson} />

      <Section title="Título">
        <TitleDropdown title={formOccurrence.titulo} updateForm={updateField} />
      </Section>

      <Section title="Local">
        <Input
          placeholder="Ex: Av. Principal, 123 - Centro"
          placeholderTextColor="#666"
          value={formOccurrence.localizacao}
          onChangeText={(text) => updateField("localizacao", text)}
          iconName="location"
        />
      </Section>

      <Section title="Descrição">
        <Input
          placeholder="Descreva detalhadamente os fatos..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={formOccurrence.descricao}
          onChangeText={(text) => updateField("descricao", text)}
        />
      </Section>

      <Section title="Data">
        <DatePicker
          date={formOccurrence.data_hora}
          onChange={(date) => updateField("data_hora", date)}
        />
      </Section>

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonPending]}
        onPress={handleSave}
        disabled={isPending}
      >
        {isPending ? (
          <View style={styles.buttonLoading}>
            <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />
            <Typography variant="largeDefault">SALVANDO...</Typography>
          </View>
        ) : (
          <Typography variant="largeDefault">SALVAR OCORRÊNCIA</Typography>
        )}
      </TouchableOpacity>
    </Wrapper>
  );
}
