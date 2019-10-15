import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
       
    },
    passwordStrength: {
        ...theme.cancelButtonColor,
        ...theme.text.buttonTextSize
    },
    confirmLabelStyle: {
        paddingTop: 36
    },
    errorText: {
        ...theme.linkColor
    },
    width50: {
        width: "50%",
        paddingHorizontal: 16,
        bottom: 470
    },
};

export default styles;
