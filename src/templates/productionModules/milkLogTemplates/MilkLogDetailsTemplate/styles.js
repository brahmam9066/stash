import {Dimensions} from "react-native";
import theme from "../../../../theme";

const {height} = Dimensions.get("window");

const styles = {
    informationViewStyle: {
        ...theme.backWhite
    },
    titlestyle: {
        ...theme.h8,
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
        paddingVertical: 16,
        paddingHorizontal: 8,
        paddingBottom: 20,
        marginHorizontal: 16,
        borderBottomWidth: 0.6,
        borderBottomColor: "#bbbbbb"
    },
    labelStyle: {
        ...theme.h8,
        lineHeight: 28
    },
    container: {
        ...theme.backWhite,
        height: height - 65 - 60
    },
    row: {
        flexDirection: "row"
    },
    col25: {
        width: "25%"
    },
    col50: {
        width: "50%"
    },
    eventTextStyle: {
        lineHeight: 28,
        ...theme.linkColor
    },
    tableHeading: {
        fontSize: 12,
        lineHeight: 30,
        color: "#aaaaaa"

    },
    tableData: {
        ...theme.h6,
        lineHeight: 28,
        color: "#666666"
    }
};

export default styles;
