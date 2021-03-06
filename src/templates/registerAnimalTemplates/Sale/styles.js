import theme from "../../../theme";

const styles = {
    bodyContent: {
        paddingBottom: 16
    },
    h6: {
        ...theme.h6
    },
    paddingHorizontal: {
        paddingHorizontal: 16,
        paddingTop: 30
    },
    paddingHorizontal16: {
        paddingHorizontal: 16
    },
    buttonStyle: {
        marginLeft: 30,
        marginRight: 30
    },
    buttonTextStyle: {
        ...theme.text.buttonTextSize
    },
    flex1: {
        flex: 1
    },
    scrollViewStyle: {
        paddingBottom: 20,
        flexGrow: 1
    },
    cattleDetailsConteiner: {
        paddingVertical: 24,
        paddingHorizontal: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: "grey",
        marginHorizontal: 20
    },
    noFormTextStyle: {
        textAlign: "center",
        padding: 16,
        ...theme.text.buttonTextSize,        
        paddingBottom: 20
    },
    labelStyle: {
        ...theme.h7,
        lineHeight: 25
    },
    textStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor
    }
};

export default styles;
