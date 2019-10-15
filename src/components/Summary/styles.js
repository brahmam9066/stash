import theme from "../../theme";

const styles = {

    flexRowStyle: {
        flexDirection: "row"
    },
    titlestyle: {
        ...theme.h7,
        lineHeight: 30,
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
    },
    labelstyle: {
        ...theme.headWeight,
        ...theme.text.textColor
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.textColor,      
        ...theme.text.titleSize
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
};

export default styles;
