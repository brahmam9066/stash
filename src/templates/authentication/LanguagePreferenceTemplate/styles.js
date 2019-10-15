import theme from "../../../theme";

const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
    },
    welcomeText: {
        ...theme.h5,
        paddingTop: 10,
        paddingBottom: 16
    },
    loginWrapper: {
        padding: 16,
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
    instructions: {
        ...theme.text.textColor, 
        paddingLeft: 20,
        ...theme.text.buttonTextSize
        
    },
    bodyContent:{
        paddingLeft:14,
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
    }
};

export default styles;
