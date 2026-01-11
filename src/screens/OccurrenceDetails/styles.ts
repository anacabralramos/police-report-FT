import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    color: "#8e8e93",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2, // Ajustado para ficar colado no valor
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  mainContainer: { flex: 1, backgroundColor: "#0A0F14" },
  sectionHeader: { marginVertical: 20 },
  titleText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateText: {
    color: "#1d4ed8",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "600",
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  infoCard: {
    backgroundColor: "#1c252e",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 15,
  },
  infoText: { color: "#fff", fontSize: 15, marginLeft: 8 },
  descriptionText: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  personTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0F14",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  personTagText: { color: "#fff", marginLeft: 10, fontSize: 14 },
});
