import theme from "../../../../theme";

const styles = {
    mainContainer: {
        flex: 1
    },
    container: {
        ...theme.backGroundColor,
        flex: 0.9,
        zIndex: -1
    },
    filterViewContainer: {
        ...theme.backWhite,
        borderBottomWidth: 1,
        borderBottomColor: "#BBBBBB",
        paddingVertical: 25
    },
    boxViewContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 20
    },
    boxTextStyle: {
        alignSelf: "center",
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    boxStyle: {
        flexDirection: "row",
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderWidth: 0.7,
        justifyContent: "center",
        borderRadius: 2
    },
    itemseperator: {
        borderWidth: 1,
        borderColor: "#bbbbbb",
        marginHorizontal: 10
    },
    itemContainer: {
        padding: 20,
        flexDirection: "row"
    },
    rowContainer: {
        flex: 9
    },
    itemRightIconContainer: {
        flex: 1,
        justifyContent: "center"
    },
    padding10: {
        paddingLeft: 10,
        lineHeight: 30,
        ...theme.text.textColor,
        ...theme.text.titleSize,
        ...theme.h7
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 140,
        height: 80,
        width: 80
    },
    backgroundGrey: {
        backgroundColor: "#f0f0f0"
    },
    backgroundWhite: {
        ...theme.backWhite
    },
    listViewContainer: {
        ...theme.backWhite,
        marginTop: 20
    },
    footerViewStyle: {
        flex: 0.1
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    labelstyle: {
        ...theme.headWeight,
        ...theme.text.textColor
    }
};

export default styles;
