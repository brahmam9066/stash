import theme from "../../../../theme";

const styles = {
    informationViewStyle: {
        ...theme.backWhite
    },
    container: {
        paddingBottom: 70,
        // backgroundColor: "#f0f0f0"
        backgroundColor: "#ffffff"
    },
    filterViewContainer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    listViewContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: "#cccccc"
    },
    profileViewStyle: {
        paddingVertical: 24,
        paddingHorizontal: 24,
        paddingBottom: 20
    },
    breedViewStyle: {
        paddingVertical: 18,
        // paddingHorizontal: 6,
        borderTopWidth: 0.6,
        borderTopColor: "grey",
        marginHorizontal: 20
    },
    borderWidth0: {
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    textStyle: {
        fontSize: 11.5,
        color: "#58595B",
        paddingVertical: 8
    },
    pageNavImageStyle: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    titlestyle: {
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 30,
        color: "#58595B"
    },
    eventTextStyle: {
        lineHeight: 30,
        color: "#ed1c24"
    },
    labelstyle: {
        fontWeight: "500",
        color: "#58595B",
        fontSize: 15,
        lineHeight: 26
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 30,
        color: "#58595B",
        fontSize: 14
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    morphologicalView: {
        paddingVertical: 15
    },
    tableStyle: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 10
    },
    tabstyle: {
        width: "20%",
        lineHeight: 30,
        color: "#757678",
        fontSize: 14
    },
    mainContainer: {
        flex: 1
    },
    footerViewStyle: {
        flex: 0.1
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
        borderTopWidth: 20,
        borderTopColor: "#eeeeee",
        paddingTop: 10
    }
};
export default styles;
