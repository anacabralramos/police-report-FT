import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    gap: 10, // Espaçamento entre os chips
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
  },
  chipActive: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8",
  },
  chipText: {
    color: "#8e8e93",
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
