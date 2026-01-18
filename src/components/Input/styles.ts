import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#161B22",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#30363D",
    minHeight: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  input: {
    color: "#FFFFFF",
    flexShrink: 1,
    flex: 1,
  },
});
