import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Adicione ao seu arquivo de estilos:
  searchSection: { zIndex: 10, marginBottom: 15 },
  searchResultsList: {
    backgroundColor: "#161B22",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#30363D",
  },
  searchItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#30363D",
  },
  searchItemText: { color: "#fff", fontSize: 14 },

  sectionLabel: {
    color: "#8e8e93",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "bold",
  },

  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    height: 35,
  },
  chipText: { color: "#fff", fontWeight: "500" },

  divider: { height: 1, backgroundColor: "#30363D", marginVertical: 20 },

  formInput: {
    backgroundColor: "#161B22",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#30363D",
  },
  addAndSelectButton: {
    flexDirection: "row",
    backgroundColor: "#059669", // Verde para indicar criação
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  confirmButton: {
    backgroundColor: "#1d4ed8",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  // Adicione estes estilos ao seu StyleSheet.create

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0A0F14", // Fundo escuro padrão do app
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22", // Cinza levemente mais claro que o fundo
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#30363D",
    paddingHorizontal: 12,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    height: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ghostButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1d4ed8",
    borderStyle: "dashed", // Opcional: dá um toque de "espaço para adicionar"
    backgroundColor: "rgba(29, 78, 216, 0.05)", // Azul bem clarinho de fundo
    marginVertical: 10,
  },
});
