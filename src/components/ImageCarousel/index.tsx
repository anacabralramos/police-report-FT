import React, { useState } from "react";
import {
  FlatList,
  Image,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { getImageUrl } from "@hooks";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Typography from "components/Typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ImageCarousel({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  // Se não houver imagens, exibe uma imagem padrão de "sem foto"
  if (!images || images.length === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.image, styles.placeholderContainer]}>
          <Ionicons name="person-circle-outline" size={80} color="#30363D" />
          <Typography variant="default" color="#484f58">
            Sem fotos disponíveis
          </Typography>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: getImageUrl(item) }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />

      {/* Paginação Estilizada */}
      {images.length > 1 && (
        <View style={styles.paginationContainer}>
          {images.map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  isActive ? styles.activeDot : styles.inactiveDot,
                  { width: isActive ? 20 : 8 }, // Efeito de expansão
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
