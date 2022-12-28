import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "rgba(18, 179, 61, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  emptyTitle: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: "bold",
  },
  addText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#212121",
  },
  categoryList: {
    padding: 8,
  },
  categoryDivider: {
    marginVertical: 6,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  timestamp: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
  },
  attributeLabel: {
    color: "gray",
    textAlign: "center",
  },
  totalItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default styles;
