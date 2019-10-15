import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
    },
    loginWrapper: {
       paddingHorizontal: 16,
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
    personalStyles: {
        ...theme.h6,
        marginTop: 30,
    }
};

export default styles;
