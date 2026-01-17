import React, { useState } from "react";
import {
  FlatList,
  Image,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getImageUrl } from "@hooks";

import Typography from "components/Typography";
import { styles } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ImageCarousel({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Image
              source={{ uri: getImageUrl(item) }}
              style={styles.image}
              resizeMode={isExpanded ? "contain" : "cover"}
            />
          </TouchableOpacity>
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
                  { width: isActive ? 20 : 8 },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
