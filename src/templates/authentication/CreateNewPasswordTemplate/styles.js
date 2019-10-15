import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1
    },
    welcomeText: {
        ...theme.h5,
        paddingVertical: 16,
        color: "#5c5d5f"
    },
    loginWrapper: {
        padding: 16
    },
    loginButtonStyle: {
        marginTop: 16,
        marginHorizontal: 8
    },
    loginTextStyle: {
        ...theme.text.buttonTextSize
    },
    instructions: {
        ...theme.text.textColor,
        paddingLeft: 20,
        ...theme.text.titleSize
    }
};

export default styles;
