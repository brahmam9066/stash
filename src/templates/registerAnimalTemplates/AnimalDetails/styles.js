import theme from "../../../theme";

const styles = {
    container: {
        paddingBottom: 115
    },
    backgroundWhite: {
        ...theme.backWhite
    },
    informationViewStyle: {
        marginTop: 20,
        ...theme.backWhite
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    titlestyle: {
        ...theme.h7,
        lineHeight: 30
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
    },
    labelstyle: {
        ...theme.text.textColor,
        ...theme.headWeight
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
    },
    profileViewStyle: {
        paddingVertical: 22,
        paddingHorizontal: 24
    },
    pregnancyViewStyle: {
        paddingVertical: 18,
        paddingHorizontal: 24
    },
    breedViewStyle: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderTopColor: "grey"
    },
    searchbarBackground: {
        borderRadius: 4
    },
    disableTextColor: {
        color: "#BBBBBB"
    },
    enableTextColor: {
        color: "#ed1c24"
    }
};

export default styles;
