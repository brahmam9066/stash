import theme from "../../theme";

const styles = {
    inputComponentStyles: {
        height: 100,
        borderColor: "grey",
        borderWidth: 0.7,
        textAlignVertical: "top"
    },
    labelText: {
        paddingBottom: 15,
        ...theme.text.buttonTextSize,
        ...theme.text.textColor        
    }
};

export default styles;
