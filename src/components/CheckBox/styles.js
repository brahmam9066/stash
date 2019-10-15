import theme from "../../theme";

const styles = {
    termsPolicyTextStyle: {
        paddingLeft: 6,
        paddingTop:3,
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    checkboxCont: {
        flexDirection: "row"
    }
};

export default styles;
