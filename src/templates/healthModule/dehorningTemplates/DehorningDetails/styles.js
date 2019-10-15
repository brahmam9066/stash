import theme from "../../../../theme";

const styles = {
    informationViewStyle: {
        ...theme.backWhite,
        borderBottomWidth: 20,
        borderBottomColor: "#eeeeee"
    },
    titlestyle: {
        ...theme.h6,
        lineHeight: 30
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor
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
        paddingVertical: 16,
        paddingHorizontal: 24,
        paddingBottom: 20
    },
    breedViewStyle: {
        paddingVertical: 18,
        paddingHorizontal: 6,
        borderTopWidth: 0.6,
        borderTopColor: "grey",
        marginHorizontal: 20
    },
    bodyContent: {
        paddingBottom: 50
    },
    cattleDetailsConteiner: {
        paddingVertical: 28,
        paddingHorizontal: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: "grey",
        marginHorizontal: 16
    },
    noFormTextStyle: {
        textAlign: "center",
        padding: 16,
        fontSize: 16,
        paddingBottom: 20
    },
    labelStyle: {
        ...theme.h7,
        lineHeight: 30
    },
    container: {
        paddingBottom: 70,
        ...theme.backWhite
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    listViewContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: "#cccccc"
    },
    width60: {
        width: "60%"
    },
    width40: {
        width: "40%"
    },
    disableTextColor: {
        color: "#BBBBBB"
    },
    enableTextColor: {
        color: "#ed1c24"
    },
    clinicalFindingsViewContainer: {
        paddingBottom: 20,
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
        paddingVertical: 5
    },
    hr: {
        marginHorizontal: 15,
        borderBottomWidth: 0.6,
        borderBottomColor: "grey"
    },
    imageUploadWrapper: {
        marginTop: 15,
        paddingHorizontal: 9
    }
};

export default styles;
