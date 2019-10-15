import theme from "../../theme";

const styles = {
    listItemContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        alignItems: "center",
        padding: 16
    },
    leftIconContainer: {
        width: 60
    },
    defaultIconDimensions: {
        ...theme.defaultIconDimensions
    },
    defaultBodyText: {
        fontSize: 16,
        width: 220
    },
    rightIconContainer: {
        position: "absolute",
        right: 8
    }
};

export default styles;
