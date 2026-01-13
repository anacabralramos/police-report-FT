import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8e8e93",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  badge: {
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
  },
  name: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 15,
  },
  hitStop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
