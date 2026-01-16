import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, View, TouchableOpacity, Alert, ScrollView } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import Typography from "components/Typography";

interface PhotoUploaderProps {
  images: string[];
  removeImage: (uri: string) => void;
  updateFotos: (fotos: string[]) => void;
}

export default function PhotoUploader({
  images,
  removeImage,
  updateFotos,
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
      updateFotos([...images, newImageUri]);
    }
  };

  const openLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      updateFotos([...images, ...selectedUris]);
    }
  };

  const handleAddPhoto = () => {
    Alert.alert("Anexar Evidência", "Como deseja adicionar a foto?", [
      { text: "Câmera", onPress: openCam },
      { text: "Galeria", onPress: openLibrary },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.photoSection}>
      <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
        <Ionicons name="camera" size={30} color="#fff" />
        <Typography variant="smallDefault" color="#fff">
          Adicionar
        </Typography>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((item) => (
          <View key={item} style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.thumbnail} />
            <TouchableOpacity
              style={styles.removeBadge}
              onPress={() => removeImage(item)}
            >
              <Ionicons name="close-circle" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
