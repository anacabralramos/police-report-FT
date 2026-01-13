import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    color: "#8e8e93",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c252e",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  icon: { marginRight: 10 },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
