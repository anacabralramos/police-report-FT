import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: "100%",
    justifyContent: "center", // Centraliza o texto verticalmente no Touchable
    color: "#fff",
    fontSize: 16,
  },
  // Adicione ou substitua estes campos no seu styles.ts:
  fullScreenOverlay: {
    position: "absolute",
    top: -500, // Cobre para cima
    left: -100,
    right: -100,
    height: 2000, // Cobre para baixo (ajuste conforme necessário)
    zIndex: 1, // Fica atrás da lista (zIndex 9999) mas na frente do resto
    backgroundColor: "transparent",
  },
  // ... resto dos estilos ...
  dropdownWrapper: {
    zIndex: 5000, // Fundamental para iOS
    position: "relative",
    marginBottom: 20, // O espaçamento agora fica aqui
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#30363D",
    paddingHorizontal: 12,
    height: 52,
    // Removido o marginBottom daqui para a lista colar no input
  },
  dropdownList: {
    position: "absolute",
    top: 78, // Altura do Label (aprox 26) + Altura do Input (52)
    left: 0,
    right: 0,
    backgroundColor: "#161B22",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1d4ed8",
    zIndex: 9999, // Valor alto para garantir sobreposição
    overflow: "hidden", // Garante que o brilho do item não saia do border da lista
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 15, // Elevation maior para destacar no modo dark
      },
    }),
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#30363D",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B22",
  },
  // Adicione estas propriedades ao seu StyleSheet.create:

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8e8e93",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputIcon: {
    marginRight: 10,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  // Recomendo adicionar este também para o ícone dentro do item da lista
  dropdownIcon: {
    marginRight: 10,
    opacity: 0.5,
  },
});
