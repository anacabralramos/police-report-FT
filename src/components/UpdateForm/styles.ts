import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0A0F14",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  contentContaioner: {
    gap: 10,
  },
  documentsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: "#1d4ed8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    gap: 10,
  },
  buttonText: {
    fontWeight: "800",
  },
});
