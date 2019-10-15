import theme from "../../theme";

const styles = {
    inputComponentStyles: {
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
        paddingTop: 4,
        height: 50
    },
    labelText: {
        ...theme.text.titleSize,        
        ...theme.text.textColor        
    },
    timeOverlay: {
        width: "100%",
        height: 50,
        bottom: 0,
        position: "absolute",
        zIndex: 1
    },
    calendarIconStyle: {
        height: 30,
        width: 30
    },
    calendarIconContainer: {
        position: "absolute",
        right: 0,
        bottom: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    }
};

export default styles;
