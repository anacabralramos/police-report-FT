import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  scrollContent: {
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#30363D",
    gap: 6,
  },
  chipActive: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8",
  },
});
