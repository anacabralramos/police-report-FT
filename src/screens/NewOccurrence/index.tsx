import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";

import { DatePicker, PhotoUploader, TitleDropdown } from "../../components";
import { styles } from "./styles"; // Use os estilos que definiremos abaixo

export default function NewOccurrence() {
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [occurrenceDate, setOccurrenceDate] = useState(new Date());

  // Função para selecionar fotos
  const pickImage = async () => {
    // 1. Solicita permissão de câmera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Você precisa permitir o acesso à câmera para tirar fotos das evidências."
      );
      return;
    }

    // 2. Abre a câmera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false, // Em ocorrências, o ideal é a foto original sem cortes
      quality: 0.7,
    });

    if (!result.canceled) {
      // Como a câmera tira uma foto por vez, pegamos o primeiro item do array assets
      const newImageUri = result.assets[0].uri;
      setImages([...images, newImageUri]);
    }
  };

  const openLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true, // Permite selecionar várias
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedUris]);
    }
  };

  const handleAddPhoto = () => {
    Alert.alert("Anexar Evidência", "Como deseja adicionar a foto?", [
      { text: "Câmera", onPress: pickImage }, // chama a função de câmera
      { text: "Galeria", onPress: openLibrary }, // chama a função de galeria
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const removeImage = (uri: string) => {
    setImages(images.filter((img) => img !== uri));
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
            paddingBottom: 40,
          },
        ]}
      >
        <Text style={styles.headerTitle}>Novo cadastro</Text>

        {/* Seção de Fotos */}
        <PhotoUploader
          images={images}
          removeImage={removeImage}
          handleAddPhoto={handleAddPhoto}
        />

        {/* Campo de titulo */}
        <TitleDropdown />

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
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Campo Descrição */}
        <Text style={styles.label}>Relato da Ocorrência</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva detalhadamente os fatos..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
        <DatePicker
          label="Data e Hora"
          date={occurrenceDate}
          onChange={setOccurrenceDate}
        />

        {/* Botão de Envolvidos (Desabilitado por enquanto) */}
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary, { opacity: 0.6 }]}
          disabled={true}
        >
          <Ionicons
            name="person-add"
            size={20}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Vincular Envolvidos (Em breve)</Text>
        </TouchableOpacity>

        {/* Botão Salvar (Final) */}
        <TouchableOpacity style={styles.buttonMain}>
          <Text style={styles.buttonText}>SALVAR OCORRÊNCIA</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
