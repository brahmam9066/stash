import theme from "../../../theme";

const styles = {
    container: {
        paddingBottom: 140,
        ...theme.backGroundColor
    },
    filterViewContainer: {
        ...theme.backWhite,
        paddingHorizontal: 8,
        paddingTop: 36
    },
    listViewContainer: {
        ...theme.backWhite,        
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 60
    },
    rowContainer: {
        borderTopColor: "grey",
        borderTopWidth: 0.2
    },
    summaryViewStyle: {
        paddingVertical: 30
    },
    textStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor,
        paddingVertical: 8
    },
    pageNavImageStyle: {
        width: 40,
        height: 40,
        resizeMode: "contain"
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
        ...theme.h7
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.titleSize,
        ...theme.text.textColor,
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    morphologicalView: {
        paddingVertical: 15,
        borderTopColor: "grey",
        borderTopWidth: 0.6
    },
    breedViewStyle: {
        borderTopColor: "grey",
        borderTopWidth: 0.6,
        paddingVertical: 30
    },
    tabIconStyle: {
        width: 60,
        height: 50
    },
    tabStyle: {
        alignItems: "center",
        padding: 14
    },
    disableTextColor: {
        color: "#BBBBBB"
    },
    enableTextColor: {
        color: "#ed1c24"
    }
};
export default styles;
