import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
  },
  placeholderImage: {
    alignItems: "center",
  },
});
