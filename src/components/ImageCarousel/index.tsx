import React from "react";
import { FlatList, Image, View, StyleSheet, Dimensions } from "react-native";
import { getImageUrl } from "../../hooks";

const { width } = Dimensions.get("window");

export default function ImageCarousel({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: getImageUrl(item) }}
            style={styles.image}
            onLoadStart={() => console.log("Carregando foto...")}
            onError={(e) =>
              console.log("Erro ao carregar foto:", e.nativeEvent.error)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 250, backgroundColor: "#1c252e" },
  image: { width: width, height: 250, resizeMode: "cover" },
});
