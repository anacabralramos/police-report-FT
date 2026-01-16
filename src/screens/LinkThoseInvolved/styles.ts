import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  search: {
    zIndex: 10,
    marginBottom: 15,
  },
  searchResults: {
    backgroundColor: "#161B22",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#30363D",
  },
  searchItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#30363D",
  },
  selectedText: {
    marginBottom: 10,
  },

  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  divider: { height: 1, backgroundColor: "#30363D", marginVertical: 20 },
  ghostButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1d4ed8",
    borderStyle: "dashed",
    backgroundColor: "rgba(29, 78, 216, 0.05)",
    marginVertical: 10,
    gap: 10,
  },
  confirmButton: {
    backgroundColor: "#1d4ed8",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: { fontWeight: "bold" },
});
