import theme from "../../../theme";

const styles = {
    mainContainer: {
        flex: 1
    },
    container: {
        ...theme.backGroundColor,
        flex: 0.9
    },
    filterBoxStyle: {
        flexDirection: "row",
        justifyContent: "center"
    },
    listViewContainer: {
        ...theme.backWhite,
        marginTop: 5
    },
    filterViewContainer: {
        ...theme.backWhite,
        borderBottomWidth: 1,
        borderColor: "#bbbbbb",
        paddingBottom: 18
    },
    imageStyle: {
        width: 70,
        height: 70
    },
    boxStyle: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 0.7,
        borderRadius: 2
    },
    textStyle: {
        ...theme.text.buttonTextSize,
        ...theme.text.textColor,
        alignSelf: "center",
        paddingHorizontal: 5
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
    footerViewStyle: {
        flex: 0.1
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 140,
        height: 80,
        width: 80
    },
    layoutView: {
        zIndex: 99999999,
        position: "relative"
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
        marginVertical: 15,
        marginHorizontal: 15,
        backgroundColor: "#f0494f",
        alignSelf: "flex-end",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: 7
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
    textWidth: {
        width: 200
    }
};
export default styles;
