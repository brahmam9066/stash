import {dpToPx} from "../../../utils/utility";
import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1
    },
    welcomeText: {
        ...theme.headSize,
        ...theme.headWeight,
        paddingVertical: 16,
        ...theme.text.textColor
    },
    loginWrapper: {
        padding: 16
    },
    loginButtonStyle: {
        marginTop: 16,
        marginHorizontal: 8,
        elevation: 2
    },
    loginTextStyle: {
        ...theme.text.buttonTextSize
    },
    receiveSmsText: {
        ...theme.text.textColor,
        marginTop: 16,
        marginLeft: 10,
        ...theme.text.buttonTextSize
    },
    registeredMobileNumber: {
        ...theme.text.textColor,
        textAlign: "center",
        ...theme.text.buttonTextSize
    }
};

export default styles;
