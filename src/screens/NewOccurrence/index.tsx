import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { DatePicker, PhotoUploader, TitleDropdown } from "../../components";
import { CreateOccurrencePayload, useCreateOccurrence } from "../../hooks";
import { useOccurrenceStore } from "../../store/occurrenceStore";
import { useAuthStore } from "../../store/authStore";
import { TabParamList } from "../../navigation";
import { initialFormState } from "./constants";
import { OccurrenceForm } from "../../types";
import { styles } from "./styles"; // Use os estilos que definiremos abaixo

type NewOccurrenceNavigationProp = BottomTabNavigationProp<
  TabParamList,
  "Nova"
>;

export default function NewOccurrence() {
  const navigation = useNavigation<NewOccurrenceNavigationProp>();

  const insets = useSafeAreaInsets();
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

    console.log(JSON.stringify(payload));
    //   // 3. Disparar o mutation (que criamos anteriormente)
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

        // 4. (Opcional) Levar o usuário para a lista de ocorrências
        // navigation.navigate("Ocorrências");
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0A0F14" }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            // paddingTop: Platform.OS === "ios" ? 10 : insets.top + 20,
            // { paddingTop: insets.top + 20, paddingBottom: 40 },
            // paddingBottom: 40,
          },
        ]}
      >
        <Text style={styles.headerTitle}>Novo cadastro</Text>

        {/* Seção de Fotos */}
        <PhotoUploader
          images={formOccurrence.fotos}
          removeImage={removeImage}
          updateForm={updateField}
        />

        {/* Campo de titulo */}
        <TitleDropdown title={formOccurrence.titulo} updateForm={updateField} />

        {/* Lista de Envolvidos Selecionados */}
        {involved.length > 0 && (
          <View style={styles.involvedContainer}>
            <Text style={styles.sectionTitle}>Envolvidos vinculados:</Text>
            {involved.map((person) => (
              <View key={person.id} style={styles.personBadge}>
                <View style={styles.personInfo}>
                  <Ionicons name="person" size={16} color="#1d4ed8" />
                  <Text style={styles.personName} numberOfLines={1}>
                    {person.nome}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removePerson(person.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close-circle" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {/* Botão de Envolvidos (Desabilitado por enquanto) */}
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
        {/* <TouchableOpacity style={styles.buttonMain} onPress={handleSave}>
          <Text style={styles.buttonText}>SALVAR OCORRÊNCIA</Text>
        </TouchableOpacity>
         */}
        <TouchableOpacity
          style={[
            styles.buttonMain,
            isPending && { opacity: 0.7 }, // Estilo visual de desabilitado
          ]}
          onPress={handleSave}
          disabled={isPending} // Impede que o usuário clique várias vezes
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
