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
        paddingBottom: 20
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
        borderTopWidth: 0.6,
        borderTopColor: "#bbbbbb",
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
        paddingBottom: 70,
        ...theme.backWhite
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    clinicalFindingsViewContainer: {
        ...theme.backGroundColor
    },
    treatmentCostContainerStyle: {
        borderTopWidth: 1,
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
    imageUploadWrapper: {
        marginHorizontal: 9,
        paddingVertical: 5,
        paddingBottom: 100
    }
};

export default styles;
