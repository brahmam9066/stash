import theme from "../../../theme";

const styles = {
    padding: {
        padding: 10
    },
    paddingHorizontal: {
        paddingLeft: 10,
        paddingRight: 10
    },
    listFeedType: {},
    listContainer: {
        ...theme.backWhite
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textBoldHighlight: {
        flex: 0.5,
        fontWeight: "bold",
        lineHeight: 30,
        backgroundColor: "#F0F0F0",
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    feedListPicker: {
        flex: 0.8
    },
    addMoreImage: {
        flex: 0.2,
        resizeMode: "contain",
        width: 50,
        height: 50
    },
    addMoreContainer: {
        flex: 0.2,
        alignSelf: "center"
    },
    width100: {
        width: "100%",
        paddingLeft: 10
    },
    textLabel: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    width50: {
        flex: 0.5,
        marginHorizontal: 5
    }
}
export default styles;
