import theme from "../../../../theme";

const styles = {
    container: {
        ...theme.backGroundColor
    },
    filterViewContainer: {
        ...theme.backWhite,
        paddingHorizontal: 8
    },
    listViewContainer: {
        ...theme.backWhite,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 60
    },
    damStyle: {
        borderBottomColor: "#BBBBBB",
        borderBottomWidth: 0.6,
        paddingVertical: 20
    },
    summaryViewStyle: {
        paddingVertical: 20
    },
    textStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor,
        paddingVertical: 8
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    titlestyle: {
        ...theme.h7,
        lineHeight: 30
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
    },
    labelstyle: {
        ...theme.h8     
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    breedViewStyle: {
        borderTopColor: "#BBBBBB",
        borderTopWidth: 0.6,
        paddingVertical: 20
    },
    tabIconStyle: {
        width: 60,
        height: 50
    },
    tabStyle: {
        alignItems: "center",
        padding: 14
    }
};
export default styles;
