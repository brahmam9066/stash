
import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1
    },
    loginWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 28,
    },
    loginButtonStyle: {
        marginTop: 28,
        marginHorizontal: 8,
    },
    loginTextStyle: {
        ...theme.text.buttonTextSize
    },
    passwordStrength: {
        ...theme.cancelButtonColor,
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
