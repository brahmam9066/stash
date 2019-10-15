import theme from "../../theme";

const styles = {
    tabsContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#BBBBBB"
    },
    tabStyle: {
        alignItems: "center",
        padding: 16
    },
    activeTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: "#ed1c24"
    },
    tabTextStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor
    }
};

export default styles;
