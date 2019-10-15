import {Dimensions} from "react-native";
import theme from "../../theme";

const {width} = Dimensions.get("window");
const windowWidth = width;

const styles = {
    pageDetailsContent: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        paddingLeft: 16
    },
    pageIconStyle: {
        width: 20,
        height: 25
    },
    pageContentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: (windowWidth - 32) - 67,
        paddingLeft: 5
    },
    textContainerStyle: {
        width: (windowWidth - 32) - 107,
        paddingLeft: 16
    },
    textContFullWidth: {
        width: (windowWidth - 32) - 67
    },
    editTextStyle: {
        ...theme.linkColor,
        ...theme.text.titleSize,
        width: 40,
        textAlign: "right",
        marginTop: 4
    },
    contentHeaderStyle: {
        ...theme.h7,
        lineHeight: 28
    },
    contentTextStyle: {
        ...theme.text.textColor,
        ...theme.text.titleSize,        
        lineHeight: 28
    }
};

export default styles;
