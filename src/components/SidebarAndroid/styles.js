import theme from "../../theme";
import fonts from "../../theme/fonts";

const styles = {
    sidebarContainer: {
        flex: 1
    },
    sidebarHeader: {
        height: 215,
        backgroundColor: theme.sidebar.backgroundColor,
        width: "100%",
        padding: 12
    },
    userNameStyle: {
        fontSize: theme.sidebar.header.fontSize,
        color: theme.sidebar.header.color,
        fontFamily: fonts.oxygen
    },
    userThumbmail: {
        marginBottom: -22,
        width: 100
    },
    rowStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItemTitleStyle: {
        color: theme.sidebar.color
    },
    farmIconStyle: {
        width: 36,
        height: 36
    },
    signStyle: {
        color: "#ffffff"
    }
};

export default styles;
