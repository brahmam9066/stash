import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
    },
    welcomeText: {
        ...theme.h5,
        paddingTop: 10,
        paddingBottom: 16
    },
    loginWrapper: {
        padding: 16,
        paddingBottom: 100
    },
    loginButtonStyle: {
        marginTop: 16,
        marginLeft: 8,
        marginRight: 8
    },
    loginTextStyle: {
        ...theme.text.buttonTextSize
    },
    viewInstructionsText: {
        marginTop: 16,
        marginLeft: 14
    },
    instructions: {
        ...theme.text.textColor,
        ...theme.text.buttonTextSize,
        paddingLeft: 8
    }
};

export default styles;
