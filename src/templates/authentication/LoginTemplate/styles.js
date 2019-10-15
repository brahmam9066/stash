import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1
    },
    welcomeText: {
        fontWeight: "500",
        paddingTop: 16,
        paddingBottom: 16,
        ...theme.h5
    },
    loginWrapper: {
        padding: 16
    },
    forgotPassword: {
        ...theme.linkColor,
        ...theme.text.textSize,
        paddingRight: 8
    },
    forgotPassButton: {
        alignSelf: "flex-end",
        marginBottom: 16
    },
    loginTextStyle: {
        ...theme.text.titleSize
    },
    signUpText: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16
    },
    loginButtonStyle: {
        marginTop: 16,
        marginLeft: 8,
        marginRight: 8,
        elevation: 2
    },
    newMemberText: {
        ...theme.text.textColor,
        ...theme.text.textSize,        
    },
    signupButtonText: {
        ...theme.linkColor,
        marginLeft: 4,
        ...theme.text.textSize,
    },
    googleViewStyle: {
        marginLeft:8,
        marginRight:8,
        marginTop:16
    },
    googleButtonStyle: {
        flexDirection:"row",
        justifyContent: "center",
        paddingVertical: 6, 
        borderWidth:0.6,
        borderRadius:4,
        borderColor: "#bbbbbb",
        elevation:2,
        backgroundColor: "#ffffff",
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    googleButtonTextStyle: {
        alignSelf: "center",
        color: "#333333",
        ...theme.headWeight,
        ...theme.text.titleSize
    },
    googleIconStyle: {
        width:30,
        height:30
    }
};

export default styles;
