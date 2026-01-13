import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // --- Estilos Globais / Reciclados ---
  // container: { padding: 20 },
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

  buttonMain: {
    backgroundColor: "#1d4ed8",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // --- Estilos Específicos de 'Nova Ocorrência' ---
  photoSection: { flexDirection: "row", marginBottom: 25, height: 100 },
  addPhotoButton: {
    width: 90,
    height: 90,
    backgroundColor: "#1c252e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#334155",
    marginRight: 10,
  },
  addPhotoText: { color: "#fff", fontSize: 12, marginTop: 5 },
  imageContainer: { marginRight: 10, position: "relative" },
  thumbnail: { width: 90, height: 90, borderRadius: 12 },
  removeBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  textArea: {
    backgroundColor: "#1c252e",
    borderRadius: 8,
    padding: 15,
    height: 150,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#334155",
  },
  buttonSecondary: {
    backgroundColor: "#334155",
    flexDirection: "row",
    height: 55,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  // --- Estilos Específicos de 'Busca de Pessoa' ---
  personCard: {
    backgroundColor: "#1c252e",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  personCpf: {
    color: "#8e8e93",
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "#8e8e93",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 40,
  },
});
