import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1d4ed8",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  buttonPending: {
    opacity: 0.7,
  },
  buttonLoading: {
    flexDirection: "row",
    alignItems: "center",
  },
});
