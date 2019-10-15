import theme from "../../theme";

const styles = {
    labelText: {
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    caretStyle: {
        position: "absolute",
        bottom: 6,
        right: 8
    },
    listPickerContainer: {
        position: "relative"
    },
    listPickerStyle: {
        height: 50,
        width: "100%",
        backgroundColor: "#ffffff"
    },
    listPickerBorder: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey"
    }
};

export default styles;
