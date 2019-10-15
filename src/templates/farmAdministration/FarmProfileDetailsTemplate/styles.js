import { Dimensions } from "react-native";
import theme from "../../../theme";

const { width } = Dimensions.get("window");
const windowWidth = width;

const styles = {
    container: {
        flex: 1,
        ...theme.backWhite
    },
    backgroundWhite: {
        ...theme.backWhite
    },
    emailTextStyle: {
        ...theme.text.textColor
    },
    contentContainer: {
        borderTopWidth: 16,
        paddingVertical: 22,
        borderTopColor: "#f2f2f2",
        paddingLeft:16,
        flexDirection: "row",
    },
    pageDetailsContent: {
        ...theme.backWhite,
        flexDirection: "row",
        paddingLeft: 16,
    },
    pageIconStyle: {
        width: 20,
        height: 25,
    },
    pageContentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 52, // width - horizontal_padding - icon_wdth
        paddingLeft: 5
    },
    textContainerStyle: {
        width: "100%",
        paddingLeft: 16
    },
    // textContFullWidth: {
    //   width: (windowWidth - 32) - 88
    // },
    editTextContainerStyle: {
        flex: 1,
        justifyContent: "flex-end"
    },
    editTextStyle: {
        ...theme.linkColor,
        ...theme.text.titleSize,
        textAlign: "right",
        paddingRight: 15
    },
    contentHeaderStyle: {
        ...theme.h7
    },
    contentTextStyle: {
        ...theme.text.textColor,
        ...theme.text.titleSize,
        lineHeight: 28
    },
    addressStyle: {
        paddingTop: 6
    },
    row: {
        width: "100%",
        flexDirection: "row",
        paddingVertical: 10
    },
    flex1: {
        flex: 1,
        justifyContent: "center"
    }
};

export default styles;
