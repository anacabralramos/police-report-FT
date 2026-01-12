import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // No seu styles.ts

  container: {
    flex: 1,
    backgroundColor: "#0A0F14", // Fundo Dark profundo
    paddingHorizontal: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8e8e93", // Cinza suave para labels
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  formInput: {
    backgroundColor: "#161B22",
    borderRadius: 8,
    padding: 15,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#30363D",
  },

  addAndSelectButton: {
    backgroundColor: "#1d4ed8", // Azul destaque
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    gap: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
