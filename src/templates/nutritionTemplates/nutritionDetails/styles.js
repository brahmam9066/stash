import theme from "../../../theme";

const styles = {
    informationViewStyle: {
        ...theme.backWhite,
        borderBottomWidth: 0.6,
        borderBottomColor: "grey",
        paddingHorizontal: 8,
        marginHorizontal: 20
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
        paddingVertical: 20,
        paddingBottom: 20
    },
    breedViewStyle: {
        paddingVertical: 18,
        // paddingHorizontal: 6,
        marginHorizontal: 20
    },
    bodyContent: {
        paddingBottom: 16,
        paddingTop: 12
    },
    cattleDetailsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: "grey",
        marginHorizontal: 20
    },
    labelStyle: {
        ...theme.h7,
        lineHeight: 30
    },
    container: {
        paddingBottom: 150,
        ...theme.backWhite
    },
    flexRowStyle: {
        flexDirection: "row"
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
        borderTopWidth: 0.6,
        paddingVertical: 10,
        borderTopColor: "grey",
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
    flatStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemPane: {
        flex: 0.5
    },
    subtitleHolder: {
        marginHorizontal: 20,
        paddingHorizontal: 8,
        paddingTop: 20
    }
};

export default styles;
