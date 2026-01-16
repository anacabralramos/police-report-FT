import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#1d4ed8",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  hitStop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
