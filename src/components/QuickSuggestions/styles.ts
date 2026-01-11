import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Container que envolve o Input e as Sugestões
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  // Estilos das Sugestões Rápidas
  suggestionsWrapper: {
    marginTop: 12,
  },
  suggestionTitle: {
    color: "#8e8e93",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  suggestionScroll: {
    flexDirection: "row",
  },
  suggestionChip: {
    backgroundColor: "rgba(29, 78, 216, 0.1)", // Azul da marca com 10% de opacidade
    borderWidth: 1,
    borderColor: "#1d4ed8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    // Um leve efeito de sombra para profundidade (opcional)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  suggestionChipText: {
    color: "#3b82f6", // Um azul levemente mais claro para leitura no fundo escuro
    fontSize: 14,
    fontWeight: "600",
  },

  // Ajuste no inputContainer para quando ele estiver acima das sugestões
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    borderColor: "#30363D",
  },
});
