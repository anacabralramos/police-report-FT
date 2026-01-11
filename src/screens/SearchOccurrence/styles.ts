import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  dateFilterContainer: {
    marginTop: 5,
  },
  dateSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
    borderWidth: 1,
    borderColor: "#30363D",
  },
  dateSelectorText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  ////////
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#0A0F14",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    marginTop: 10,
  },
  // Barra de Busca
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: "#30363D",
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  // Opções de Filtro (Data e Limpar)
  filterOptions: {
    backgroundColor: "#161B22",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1d4ed8",
  },
  clearButton: {
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#30363D",
  },
  clearButtonText: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 14,
  },
  // Card da Ocorrência
  occurrenceCard: {
    flexDirection: "row",
    backgroundColor: "#161B22",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden", // Garante que a imagem respeite o border do card
    borderWidth: 1,
    borderColor: "#30363D",
    alignItems: "center",
  },
  imageSide: {
    width: 100,
    height: 110,
  },
  occurrenceCover: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    backgroundColor: "#21262D",
    justifyContent: "center",
    alignItems: "center",
  },
  occurrenceInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  occurrenceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  occurrenceDate: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "bold",
  },
  occurrenceLocation: {
    color: "#8e8e93",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  occurrenceTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 20,
  },
  involvedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0F14",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  personName: {
    color: "#C9D1D9",
    fontSize: 12,
    marginLeft: 6,
  },
  // Estados Vazios
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    color: "#8e8e93",
    fontSize: 16,
    marginTop: 16,
  },
});
