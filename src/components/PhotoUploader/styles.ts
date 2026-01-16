import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  photoSection: { flexDirection: "row" },
  addPhotoButton: {
    width: 90,
    height: 90,
    backgroundColor: "#1c252e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#334155",
    marginRight: 10,
  },
  imageContainer: { marginRight: 10, position: "relative" },
  thumbnail: { width: 90, height: 90, borderRadius: 12 },
  removeBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#000",
    borderRadius: 10,
  },
});
