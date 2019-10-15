import theme from "../../../theme";

const styles = {
    container: {
        height: "100%",
        ...theme.backWhite
    },
    height100: {
        height: "100%"
    },
    padding: {
        padding: 10
    },
    flexRowStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    calendar: {
        margin: 10
    },
    datePicker: {
        width: "100%"
    },
    headerLabel: {
        fontWeight: "bold",
        ...theme.text.textColor,
        ...theme.headWeight,
        ...theme.text.font18
    },
    textBold: {
        flex: 0.5,
        fontWeight: "bold",
        lineHeight: 30,
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    textNormal: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    separatorHorizontal: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#58595B",
        marginTop: 15,
        marginBottom: 15
    },
    buttonStyle: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30
    }
};

export default styles;
