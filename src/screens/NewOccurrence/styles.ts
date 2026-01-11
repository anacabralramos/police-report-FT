import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { padding: 20 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
  },
  label: {
    color: "#8e8e93",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c252e",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: "#fff", paddingVertical: 15, fontSize: 16 },
  textArea: {
    backgroundColor: "#1c252e",
    borderRadius: 8,
    padding: 15,
    height: 150,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    flexDirection: "row",
    height: 55,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonSecondary: { backgroundColor: "#334155" },
  buttonMain: {
    backgroundColor: "#1d4ed8",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
