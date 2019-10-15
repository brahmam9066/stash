import theme from "../../../theme";

// import {dpToPx} from "../../utils/utility";

const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
    },
    loginFormStyle: {
        paddingTop: 20
    },
    row: {
        flexDirection: "row"
    },
    width50: {
        width: "50%",
        paddingHorizontal: 16
    },
    width49: {
        width:"49%"
    },
    errorText: {
        ...theme.linkColor
    }
};

export default styles;
