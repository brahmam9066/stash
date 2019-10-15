import theme from "../../../../theme";

const styles = {
    informationViewStyle: {
        ...theme.backWhite
    },
    titlestyle: {
        ...theme.h7,
        lineHeight: 28       
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 28,
        ...theme.text.textColor,       
        ...theme.text.titleSize
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profileViewStyle: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    bodyContent: {
        paddingBottom: 16
    },
    cattleDetailsConteiner: {
        paddingVertical: 28,
        paddingHorizontal: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: "#bbbbbb",
        marginHorizontal: 16
    },
    detailsViewStyle: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        paddingBottom: 20,
        marginHorizontal: 16
    },
    labelStyle: {
        ...theme.h8,       
        lineHeight: 28
    },
    container: {
        paddingBottom: 250,
        ...theme.backWhite
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
    },
    disableTextColor: {
        color: "#BBBBBB"
    },
    enableTextColor: {
        color: "#ed1c24"
    },
    imageUploadWrapper: {
        marginHorizontal: -5,
        borderTopWidth: 20,
        borderTopColor: "#eeeeee",
        paddingHorizontal: 15,
        paddingVertical: 5
    }
};

export default styles;