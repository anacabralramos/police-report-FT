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
  dateText: { color: "#fff", fontSize: 16 },
  iosSheet: {
    backgroundColor: "#1c252e",
    borderRadius: 12,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  iosButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  iosButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButton: { backgroundColor: "#1d4ed8" },
  cancelButton: { backgroundColor: "#334155" },
  confirmText: { color: "#fff", fontWeight: "bold" },
  cancelText: { color: "#8e8e93", fontWeight: "bold" },
});
