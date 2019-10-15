import theme from "../../../theme";


const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
    },
    formContainer: {
        paddingVertical: 16
    },
    row: {
        flexDirection: "row"
    },
    width50: {
        width: "50%",
        paddingHorizontal: 16
    },
    width100: {
        width: "100%",
        paddingHorizontal: 16
    },
    hmbFormStyle: {
        borderWidth: 0.8,
        paddingHorizontal: 8,
        paddingVertical: 24,
        borderRadius: 9
    },
    hmbFormMainStyle: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginTop: 20,
        zIndex: 888
    },
    hmbTextStyle: {
        ...theme.text.font18,
        ...theme.headWeight,
        position: "absolute",
        top: 0,
        left: 50,
        ...theme.backWhite,        
        paddingHorizontal: 8,
        zIndex: 1
    },
    orgNameStyle: {
        position: "absolute",
        right: 0,
        top: 40
    },
    errorText: {
        ...theme.linkColor
    }
};

export default styles;
