import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";

import { useAuthStore, useOccurrenceStore } from "@store";
import { OccurrenceForm } from "@types";
import {
  Wrapper,
  DatePicker,
  Input,
  Typography,
  LocationModal,
  AddressInput,
} from "@components";
import {
  CreateOccurrencePayload,
  useCreateOccurrence,
  useLocation,
} from "@hooks";

import { InvolvedInLinking, Section, TitleDropdown } from "./components";
import { initialFormState } from "./constants";
import { styles } from "./styles";

export default function NewOccurrence() {
  const { user } = useAuthStore();

  const involved = useOccurrenceStore((state) => state.selectedPeople);
  const removePerson = useOccurrenceStore((state) => state.removePerson);
  const clearInvolved = useOccurrenceStore(
    (state) => state.clearOccurrenceDraft,
  );

  const { mutate: createOccurrenceMutate, isPending } = useCreateOccurrence();

  const [formOccurrence, setFormOccurrence] =
    useState<OccurrenceForm>(initialFormState);
  const { getCurrentLocation, loading } = useLocation();
  const [mapVisible, setMapVisible] = useState(false);
  const [region, setRegion] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);

  const handleOpenMap = async () => {
    const coords = await getCurrentLocation();
    if (coords) {
      setRegion(coords);
      setMapVisible(true);
    }
  };

  const handleConfirmLocation = async (coords) => {
    setAddressLoading(true);
    setMapVisible(false);

    const [address] = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (address) {
      const formattedAddress =
        Platform.OS === "ios"
          ? `${address.street}, ${address.city} - ${address.region}, ${address.postalCode}`
          : `${address.street}, ${address.district} - ${address.region}, ${address.postalCode}`;

      setFormOccurrence({ ...formOccurrence, localizacao: formattedAddress });
    }
    setAddressLoading(false);
  };

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
          [{ text: "OK" }],
        );

        // 2. Resetar o formulário local (campos de texto e fotos)
        setFormOccurrence(initialFormState);

        // 3. Limpar os envolvidos do Zustand
        clearInvolved();
      },
      onError: (error: any) => {
        Alert.alert(
          "Erro ao salvar",
          error.message || "Ocorreu um erro inesperado.",
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
        <AddressInput
          value={formOccurrence.localizacao}
          onChangeText={(text) => updateField("localizacao", text)}
          onMapPress={handleOpenMap}
          loading={addressLoading}
        />
      </Section>
      <LocationModal
        visible={mapVisible}
        initialRegion={region}
        onClose={() => setMapVisible(false)}
        onConfirm={handleConfirmLocation}
      />

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
