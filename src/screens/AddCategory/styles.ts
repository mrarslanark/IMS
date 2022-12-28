import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  attributeContainer: {
    padding: 12,
    backgroundColor: "white",
  },
  attributeInputContainer: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  attributeInput: {
    flex: 1,
  },
  attributeDeleteIcon: {
    borderRadius: 6,
  },
  attributeTypeSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attributeInfoContainer: {
    marginBottom: 12,
    marginHorizontal: 6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  attributeInfoTextContainer: {
    flex: 1,
  },
  attributeLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },
  attributeDescription: {
    fontSize: 12,
  },
  divider: {
    backgroundColor: "transparent",
  },
  attributeAddButton: {
    borderRadius: 12,
  },
  attributeListContentContainer: {
    flexGrow: 1,
  },
  attributeListContainer: {
    marginBottom: 16,
  },
  blankDivider: {
    marginVertical: 6,
    backgroundColor: "transparent",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  actionCancelContainer: {
    flex: 1,
    height: 37,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 6,
  },
  actionCancelText: {
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.4)",
    textTransform: "uppercase",
  },
  actionDivider: {
    marginHorizontal: 4,
  },
  actionPrimaryContainer: {
    flex: 1,
    height: 37,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  actionPrimaryText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  actionAddBG: {
    backgroundColor: "rgba(18, 179, 61, 0.1)",
  },
  actionUpdateBG: {
    backgroundColor: "rgba(0, 76, 255, 0.1)",
  },
  actionAddText: {
    backgroundColor: "rgba(18, 179, 61, 0.8)",
  },
  actionUpdateText: {
    backgroundColor: "rgba(0, 76, 255, 0.8)",
  },
});

export default styles;
