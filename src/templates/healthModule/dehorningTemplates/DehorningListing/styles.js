import theme from "../../../../theme";

const styles = {
    mainContainer: {
        flex: 1
    },
    container: {
        ...theme.backGroundColor,
        flex: 0.9,
        marginBottom: 50
    },
    filterBoxStyle: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10
    },
    listViewContainer: {
        ...theme.backWhite,
        marginTop: 20
    },
    filterViewContainer: {
        ...theme.backWhite
    },
    imageStyle: {
        width: 70,
        height: 70
    },
    boxStyle: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        justifyContent: "center",
        borderColor: "#dddddd"
    },
    boxBorderNoLeft: {
        borderLeftWidth: 0
    },
    boxBorderNoRight: {
        borderRightWidth: 0
    },
    boxViewContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 20
    },
    titleStyle: {
        ...theme.text.textColor
    },
    headingStyle: {
        ...theme.headWeight
    },
    boxTextStyle: {
        alignSelf: "center",
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 140,
        height: 80,
        width: 80
    },
    layoutView: {
        zIndex: 999
    },
    backgroundGrey: {
        backgroundColor: "#f0f0f0"
    },
    backgroundWhite: {
        backgroundColor: "#ffffff"
    },
    linkView: {
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    linkStyle: {
        marginVertical: 22,
        marginHorizontal: 14,
        backgroundColor: "#f0494f",
        alignSelf: "flex-end",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: 7,
    },
    linkTextStyle: {
        color: "#ffffff",
        fontSize: 14
    },
    disableBackgroundColor: {
        backgroundColor: "#BBBBBB"
    },
    enableBackgroundColor: {
        backgroundColor: "#f0494f"
    },
    defaultIconDimensions: {
        ...theme.defaultIconDimensions
    },
};
export default styles;
