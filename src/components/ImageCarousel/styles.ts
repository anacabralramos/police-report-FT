import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: "#161B22",
  },
  image: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#3b82f6",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
