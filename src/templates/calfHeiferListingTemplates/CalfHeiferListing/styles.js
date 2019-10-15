import theme from "../../../theme";

const styles = {
    mainContainer: {
        flex: 1
    },
    container: {
        ...theme.backGroundColor,
        flex: 0.9,
        zIndex:-1
    },
    filterBoxStyle: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10
    },
    listViewContainer: {
        ...theme.backWhite,
        // paddingBottom: 70,
        marginTop: 20
    },
    filterViewContainer: {
        ...theme.backWhite,        
        paddingVertical: 15
    },
    imageStyle: {
        width: 70,
        height: 70
    },
    boxStyle: {
        flexDirection: "row",
        paddingHorizontal: 26,
        paddingVertical: 8,
        borderWidth: 0.7,
        justifyContent: "center",
        borderRadius: 2
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
    // boxCountTextStyle: {
    //     alignSelf: "center",
    //     fontSize: 16,
    //     color: "#58595B",
    //     fontWeight: "500",
    //     paddingHorizontal: 12
    // },
    flexRowStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    labelstyle: {
        ...theme.headWeight,        
        ...theme.text.textColor               
    },
    textstyle: {
        lineHeight: 24,
        ...theme.text.textColor,        
        ...theme.text.titleSize,        
        flex: 0.5
    },
    flatStyle: {
        flex: 1
    },
    footerViewStyle: {
        flex: 0.1
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 150,
        height: 80,
        width: 80
    },
    searchbarBackground: {
        borderRadius: 4
    },
    backgroundGrey: {
        backgroundColor: "#f0f0f0"
    },
    backgroundWhite: {
        ...theme.backWhite
    }
};
export default styles;
