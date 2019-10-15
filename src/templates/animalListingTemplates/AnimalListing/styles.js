import theme from "../../../theme";

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
    filterBoxStyle: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10
    },
    listViewContainer: {
        ...theme.backWhite,
        marginTop: 20,
    },
    textStyle: {
        ...theme.text.buttonTextSize,
        ...theme.text.textColor,
        alignSelf: "center",
        paddingHorizontal: 5
    },
    boxImageStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    boxStyle: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderWidth: 0.7,
        borderRadius: 2
    },
    boxContainerImageStyle: {
        width: 24,
        height: 32
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    titleStyle: {
        ...theme.textColor
    },
    titleOrgStyle: {
        ...theme.textColor
    },
    headingStyle: {
        ...theme.headWeight
    },
    flatRowStyle: {
        flexDirection: "row"
    },
    flatRowImageStyle: {
        width: 20,
        height: "100%"
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 140,
        height: 80,
        width: 80
    },
    footerViewStyle: {
        flex: 0.1
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
