import theme from "../../../theme";

const styles = {
    pageHeaderStyle: {
        ...theme.backWhite,
        flex: 1,
    },
    container: {
        ...theme.backGroundColor,
        paddingBottom: 200
    },
    filterViewContainer: {
        ...theme.backWhite,        
        paddingHorizontal: 8,
        paddingTop: 30,
    },
    infoContainer: {
        borderBottomWidth: 0.6,
        borderBottomColor: "#BBBBBB",
        paddingBottom: 18,

    },
    listViewContainer: {
        ...theme.backWhite,        
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "space-between",
        borderTopColor: "grey",
        borderTopWidth: 0.2
    },
    textStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor,
        paddingVertical: 8
    },
    profileTextStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor,
    },
    labelstyle: {
        ...theme.h7,
        lineHeight: 26
    },
    pageNavImageStyle: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    summaryViewstyle: {
        paddingVertical: 20
    },
    searchbarBackground: {
        borderRadius: 4
    },
    tabIconStyle: {
        width: 60,
        height: 50
    },
    tabStyle: {
        alignItems: "center",
        paddingLeft: 16,
        paddingBottom: 16,
        paddingRight: 16
    }
};
export default styles;
