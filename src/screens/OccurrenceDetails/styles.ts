import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0A0F14", // Mesmo fundo de PersonDetails
    padding: 20,
    paddingTop: 40,
  },
  loadingCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0F14",
  },
  contentContainer: {
    marginTop: 25,
    gap: 20,
  },
  cardGap: {
    gap: 20,
  },
  description: {
    marginTop: 8,
    color: "#cbd5e1",
  },
});
