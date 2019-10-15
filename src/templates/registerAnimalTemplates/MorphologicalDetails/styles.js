import theme from "../../../theme";

const styles = {
    bodyContent: {
        paddingVertical: 16
    },
    h6: {
        ...theme.h6
    },
    paddingHorizontal16: {
        paddingHorizontal: 16,
        paddingTop: 30
    },
    buttonStyle: {
        marginLeft: 30,
        marginRight: 30,
        elevation: 2
    },
    buttonTextStyle: {
        ...theme.text.buttonTextSize
    },
    flex1: {
        flex: 1
    },
    scrollViewStyle: {
        paddingBottom: 20
    },
    spaceContainer: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
    linkButtonStyle: {
        paddingVertical: 0,
        ...theme.text.buttonTextSize,
        paddingTop: 30
    }
};

export default styles;
