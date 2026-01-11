import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function PhotoUploader({
  images,
  removeImage,
  handleAddPhoto,
}: {
  handleAddPhoto: () => void;
  images: string[];
  removeImage: (uri: string) => void;
}) {
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
