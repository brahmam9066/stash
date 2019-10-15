import theme from "../../theme";

const styles = {
    inputComponentStyles: {
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
        paddingTop: 4
    },
    labelText: {
        ...theme.text.buttonTextSize,
        ...theme.text.textColor
    },
    eyeIconContainer: {
        position: "absolute",
        right: 0,
        bottom: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    eyeIconStyle: {
        height: 10,
        width: 15
    },
    autocompleteListContainer: {
        position: "relative",
        // top: 65,
        // paddingHorizontal: 24,
        zIndex: 9999999,
        width: "100%",
        backgroundColor: "#dedede",
        elevation: 3
    },
    listItemCont: {
        padding: 16,
        width: "100%",
        borderBottomWidth: 0.2,
        zIndex: 9999,
        // borderBottomColor: "#f04a50",
        backgroundColor: "#ffffff"
    }
};

export default styles;
