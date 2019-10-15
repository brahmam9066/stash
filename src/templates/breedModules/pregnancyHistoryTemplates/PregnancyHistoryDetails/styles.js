import theme from "../../../../theme";

const styles = {
    container: {
        paddingBottom: 50,
        flex: 0.9
    },
    mainContainer: {
        flex: 1
    },
    backgroundWhite: {
        ...theme.backWhite
    },
    cattleDetailsConteiner: {
        paddingVertical: 28,
        // paddingHorizontal: 24,
        ...theme.backWhite
    },
    animalProfileView: {
        paddingVertical: 24,
        paddingHorizontal: 15
    },
    informationViewStyle: {
        ...theme.backWhite
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profileViewStyle: {
        paddingVertical: 16,
        // paddingHorizontal: 8,
        //  paddingBottom: 20,
        borderTopWidth: 0.6,
        borderTopColor: "#bbbbbb"
        // marginHorizontal: 16,
    },
    titlestyle: {
        ...theme.h6,
        lineHeight: 28
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.textColor,
        ...theme.text.titleSize,
    },
    labelstyle: {
        ...theme.headWeight,
        ...theme.text.textColor
    },
    footerViewStyle: {
        flex: 0.1
    }
};

export default styles;
