import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#161B22",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden", // Garante que a imagem respeite o border do card
    borderWidth: 1,
    borderColor: "#30363D",
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 110,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    backgroundColor: "#21262D",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  date: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "bold",
  },
  location: {
    color: "#8e8e93",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  title: {
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
  personCpf: {
    fontSize: 12,
    color: "#8e8e93",
    marginTop: 2,
    marginLeft: 10,
  },
});
