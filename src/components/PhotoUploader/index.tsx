import React from "react";
import * as ImagePicker from "expo-image-picker";
import {
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { OccurrenceForm } from "@types";

interface PhotoUploaderProps {
  images: string[];
  removeImage: (uri: string) => void;
  updateForm: (field: keyof OccurrenceForm, value: any) => void;
}

export default function PhotoUploader({
  images,
  removeImage,
  updateForm,
}: PhotoUploaderProps) {
  const openCam = async () => {
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
      updateForm("fotos", [...images, newImageUri]);
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
      updateForm("fotos", [...images, selectedUris]);
    }
  };

  const handleAddPhoto = () => {
    Alert.alert("Anexar Evidência", "Como deseja adicionar a foto?", [
      { text: "Câmera", onPress: openCam }, // chama a função de câmera
      { text: "Galeria", onPress: openLibrary }, // chama a função de galeria
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.photoSection}>
      <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
        <Ionicons name="camera" size={30} color="#fff" />
        <Text style={styles.addPhotoText}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        horizontal
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.thumbnail} />
            <TouchableOpacity
              style={styles.removeBadge}
              onPress={() => removeImage(item)}
            >
              <Ionicons name="close-circle" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
