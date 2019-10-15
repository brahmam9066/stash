import theme from "../../theme";

const styles = {
    listItemContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 12,
    },
    leftIconContainer: {
        width: 100
    },
    defaultIconDimensions: {
        ...theme.defaultIconDimensions
    },
    // defaultBodyText: {
    //     fontSize: 16,
    //     width: 220
    // },
    rightIconContainer: {
        position: "absolute",
        right: 0
    }
};

export default styles;
