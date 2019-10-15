import theme from "../../../theme";

const styles = {
    container: {
        flex: 1,
        ...theme.backGroundColor
    },
    telephoneContainer: {
        flexDirection: "row",
        marginTop: 20,
        ...theme.backWhite,
        paddingVertical: 25,
        paddingHorizontal: 20
    },
    telephoneStyle: {
        width: 22,
        height: 21
    },
    mobileNumStyle: {
        ...theme.text.textColor,
        ...theme.text.titleSize,
        marginLeft: 20,
        flex: 1
    },
    backgroundWhite: {
        ...theme.backWhite
    },
    editTextStyle: {
        ...theme.linkColor,
        ...theme.text.titleSize,        
        width: 40,
        textAlign: "right",
        marginTop: 2
    },
    emailStyle: {
        paddingHorizontal: 20,
        ...theme.text.titleSize,        
    },
    emailViewStyle: {
        flex: 6,
        ...theme.backWhite,
        flexDirection: "row",
        paddingHorizontal: 20
    }
};

export default styles;
