import theme from "../../../../theme";

const styles = {
    container: {
        paddingBottom: 50
    },
    iconStyle: {
        width: 80,
        height: 80
    },
    animalProfileTextStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor,
        lineHeight: 26
    },
    AnimallabelStyle: {
        ...theme.h7
    },
    backgroundWhite: {
        ...theme.backWhite
    },
    informationViewStyle: {
        ...theme.backWhite,
        borderTopWidth: 1,
        borderTopColor: "#cccccc"
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
        ...theme.headWeight,
        ...theme.textColor
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profileViewStyle: {
        paddingVertical: 18,
        paddingHorizontal: 24
    },
    pregnancyViewStyle: {
        paddingVertical: 10,
        paddingHorizontal: 24
    },
    breedViewStyle: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderTopColor: "#cccccc"
    },
    tableStyle: {
        flex:1,
        ...theme.backWhite,
        paddingHorizontal: 24,
        paddingBottom: 10,
        borderBottomWidth: 20,
        borderBottomColor: "#eeeeee",
        paddingLeft: 24,
        // paddingBottom: 100,
    },
    tabstyle: {
        width: "22%",
        lineHeight: 30,
        ...theme.text.titleSize,
        ...theme.textColor
    },
    animalProfileView: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    disableTextColor: {
        color: "#BBBBBB"
    },
    enableTextColor: {
        color: "#ed1c24"
    },
    clinicalFindingsView: {
        paddingVertical: 10,
        paddingHorizontal: 24
    },
    clinicalFindingsViewContainer: {
        paddingBottom: 20,
        ...theme.backGroundColor
    },
    treatmentCostContainerStyle: {
        ...theme.backWhite,
        paddingHorizontal: 24,
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
    tabIconStyle: {
        width: 60,
        height: 50
    },
    tabStyle: {
        alignItems: "center",
        paddingLeft: 16,
        paddingBottom: 16,
        paddingRight: 16
    },
    imageContainer: {
        ...theme.backWhite,
        paddingHorizontal: 11,
        paddingTop: 10,
        paddingBottom: 70
    },
};

export default styles;
