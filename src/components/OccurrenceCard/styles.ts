import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingRight: 10,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    flex: 1,
  },
  involvedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0F14",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    gap: 10,
  },
});
