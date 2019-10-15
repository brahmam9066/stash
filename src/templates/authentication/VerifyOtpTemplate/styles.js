import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1
    },
    loginWrapper: {
        padding: 44
    },
    loginButtonStyle: {
        marginTop: 80,
        marginHorizontal: 10
    },
    loginTextStyle: {
        ...theme.text.buttonTextSize
    },
    didnotGetCode: {
        ...theme.text.textColor,
        marginTop: 22,
        marginLeft: 10,
        textAlign: "center",
        ...theme.text.buttonTextSize
    },
    verifyMobileNumber: {
        ...theme.text.textColor,
        textAlign: "center",
        ...theme.text.font18
    },
    codeInput: {
        marginTop: 16,
        color: "#000"
    },
    resendStyle: {
        ...theme.linkColor,
        paddingVertical: 22,
        paddingHorizontal: 3,
        textAlign: "center",
        ...theme.text.buttonTextSize
    },
    didNotViewStyle: {
        flexDirection:"row",
        justifyContent: "center"
    }
};

export default styles;
