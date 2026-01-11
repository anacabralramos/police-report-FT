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
  headerArea: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#101820",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1c252e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#1d4ed8",
  },
  mainName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  subTitle: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 5,
    letterSpacing: 1,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c252e",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(29, 78, 216, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  valueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 2,
  },
});
