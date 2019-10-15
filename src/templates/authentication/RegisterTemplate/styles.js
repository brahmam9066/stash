import {dpToPx} from "../../../utils/utility";
import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1
    },
    welcomeText: {
        paddingTop: 44,
        paddingBottom: 20,
        ...theme.h5
    },
    signupWrapper: {
        marginLeft: 16,
        marginRight: 16
    },
    signupButtonStyle: {
        marginTop: 34,
        marginLeft: 12,
        marginRight: 12,
        elevation: 2
    },
    signupTextStyle: {
        ...theme.text.buttonTextSize
    },
    signUpText: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16
    },
    newMemberText: {
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    signupButtonText: {
        ...theme.linkColor,
        marginLeft: 4,
        ...theme.text.titleSize        
    },
    veryfySmsTextStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor,
        textAlign: "center",
        width: "100%",
        paddingTop: 18
    }
};

export default styles;
