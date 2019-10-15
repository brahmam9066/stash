import theme from "../../../../theme";

const styles = {
    informationViewStyle: {
        ...theme.backWhite
    },
    titlestyle: {
        ...theme.h6,
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
        paddingHorizontal: 8,
        paddingBottom: 20,
        borderTopWidth: 0.6,
        borderTopColor: "#bbbbbb",
        marginHorizontal: 16
    },
    detailsViewStyle: {
        borderTopWidth: 0.6,
        borderTopColor: "#bbbbbb",
        paddingVertical: 16,
        paddingHorizontal: 8,
        paddingBottom: 20,
        marginHorizontal: 16
    },
    bodyContent: {
        paddingBottom: 20
    },
    cattleDetailsConteiner: {
        paddingVertical: 28,
        paddingHorizontal: 24,
        ...theme.backWhite
    },
    labelStyle: {
        ...theme.h8,
        lineHeight: 28
    },
    container: {
        ...theme.backGroundColor,
        paddingBottom: 160
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
    },
    pdViewStyle: {
        ...theme.backWhite,
        marginTop: 20
    },
    pdStyle: {
        paddingHorizontal: 8,
        paddingVertical: 20,
        marginHorizontal: 16,
        ...theme.backWhite
    },
    noRecordsText: {
        color: "#999999",
        fontSize: 16
    },
    disableTextColor: {
        color: "#BBBBBB"
    },
    enableTextColor: {
        color: "#ed1c24"
    },
    clinicalFindingsViewContainer: {
        ...theme.backGroundColor
    },
    treatmentCostContainerStyle: {
        borderTopWidth: 0.6,
        paddingVertical: 10,
        borderTopColor: "#cccccc",
        flexDirection: "row"
    },
    treatmentTextCostTitle: {
        flex: 1,
        lineHeight: 30,
        ...theme.text.titleSize,
        color: "#000000",
        fontWeight: "500"
    },
    treatmentTextCostValue: {
        lineHeight: 30,
        ...theme.text.titleSize,
        color: "#000000",
        fontWeight: "500"
    },
    clinicalFindingsViewSubContainer: {
        flex: 1,
        paddingHorizontal: 24,
        ...theme.backWhite
    },
    imageContainer: {
        paddingHorizontal: 8
    }
};

export default styles;
