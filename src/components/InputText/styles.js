import theme from "../../theme";

const styles = {
    inputComponentStyles: {
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
        paddingTop: 4,
        height: 50
    },
    labelText: {
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    inputTextBoxStyle: {
        marginLeft: -3,
        flex: 1
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
    }
};

export default styles;
