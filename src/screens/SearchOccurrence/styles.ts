import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  occurrenceCard: {
    backgroundColor: "#1c252e",
    borderRadius: 12,
    flexDirection: "row", // Alinha imagem (esquerda) e texto (direita)
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
    height: 110, // Altura fixa para manter o padrão visual
  },
  imageSide: {
    width: 100, // Largura fixa da parte esquerda
    height: "100%",
  },
  occurrenceCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    backgroundColor: "#252f39",
    justifyContent: "center",
    alignItems: "center",
  },
  occurrenceInfo: {
    flex: 1, // Ocupa todo o espaço restante do card
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between", // Distribui os itens verticalmente
    height: "100%",
  },
  occurrenceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  occurrenceDate: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "bold",
  },
  occurrenceLocation: {
    color: "#64748b",
    fontSize: 11,
    maxWidth: "60%", // Evita que o local bata na data
  },
  occurrenceTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 2,
  },
  involvedContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#334155",
    paddingTop: 5,
  },
  // --- Estrutura Global ---
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    color: "#8e8e93",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // --- Inputs e Busca ---
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c252e",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#334155",
    height: 55,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  // --- Cards (Pessoas e Ocorrências) ---
  personCard: {
    backgroundColor: "#1c252e",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
    // Sombra leve para destacar no fundo preto
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  personCpf: {
    color: "#8e8e93",
    fontSize: 14,
    marginTop: 2,
  },

  // involvedContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 10,
  //   paddingTop: 8,
  //   borderTopWidth: 0.5,
  //   borderTopColor: "#334155",
  // },

  // --- Estados Vazios ---
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 50,
    lineHeight: 22,
  },

  // --- Botões ---
  buttonMain: {
    backgroundColor: "#1d4ed8",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Adicione ou atualize estes estilos no seu StyleSheet.create
});
