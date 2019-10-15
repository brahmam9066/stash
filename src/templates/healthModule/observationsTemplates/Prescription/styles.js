import theme from "../../../../theme";

const styles = {
    h6: {
        ...theme.h6
    },
    paddingHorizontal16: {
        paddingHorizontal: 16,
        paddingTop: 30
    },
    buttonStyle: {
        marginLeft: 28,
        marginRight: 28,
        marginTop: 15
    },
    addbuttonStyle: {
        marginLeft: 28,
        marginRight: 28,
        elevation: 2,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#6A6A6A",
    },
    buttonTextStyle: {
        ...theme.text.buttonTextSize
    },
    addButtonTextStyle: {
        ...theme.text.buttonTextSize,        
        color: "#6A6A6A"
    },
    flex1: {
        flex: 1
    },
    scrollViewStyle: {
        paddingBottom: 20
    },
    tabStyles: {
        width: "50%",
        padding: 8
    },
    tabTextStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#BBBBBB",
        textAlign: "center",
        padding: 8
    },
    tabcontainer: {
        paddingHorizontal: 16
    },
    row: {
        flexDirection: "row"
    },
    cancelIcon: {
        width: 25,
        height: 25,
        lineHeight: 25,
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#58595B",
        borderRadius: 50
    },
    cancelIconStyle: {
        position: "absolute",
        right: -10,
        top: 0,
        zIndex: 1,
        width: 35,
        height: 35
    }
};

export default styles;
