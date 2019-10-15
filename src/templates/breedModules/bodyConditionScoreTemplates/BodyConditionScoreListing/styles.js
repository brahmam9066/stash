import theme from "../../../../theme";

const styles = {
    mainContainer: {
        flex: 1,
    },
    container: {
        ...theme.backGroundColor,
        flex: 0.9
    },
    listViewContainer: {
        ...theme.backWhite,
        marginTop: 20
    },
    filterViewContainer: {
        ...theme.backWhite,        
        borderBottomWidth: 0.6,
        borderBottomColor: "#BBBBBB",
    },
    imageStyle: {
        width: 70,
        height: 70
    },
    titleStyle: {
        ...theme.text.textColor
    },
    headingStyle: {
        ...theme.headWeight,
        lineHeight: 24
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
    footerViewStyle: {
        flex: 0.1
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 140,
        height: 80,
        width: 80
    },
    linkTextStyle: {
        color: "#ffffff",
        fontSize: 14
    },
    layoutView: {
        zIndex: 999
    },
    boxStyle: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 0.7,
        justifyContent: "center"
    },
    boxViewContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 5,
        paddingBottom: 20
    },
    boxTextStyle: {
        alignSelf: "center",
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    backgroundGrey: {
        backgroundColor: "#f0f0f0"
    },
    backgroundWhite: {
        backgroundColor: "#ffffff"
    },
    disableBackgroundColor: {
        backgroundColor: "#BBBBBB"
    },
    enableBackgroundColor: {
        backgroundColor: "#f0494f"
    }
};
export default styles;
