import {Dimensions} from "react-native";
import theme from "../../../../theme";

const {width, height} = Dimensions.get("window");
const windowWidth = width;
const windowHeight = height;

const styles = {
    appContainer: {
        flex: 1,
        ...theme.backWhite
    },
    formContainer: {
        paddingTop: 24,
    },
    row: {
        flexDirection: "row"
    },
    width50: {
        width: "50%",
        paddingHorizontal: 16
    },
    width33: {
        width: "33.33%",
        paddingHorizontal: 16
    },
    width100: {
        width: "100%",
        paddingHorizontal: 16
    },
    width100Padding: {
        width: "100%",
        paddingHorizontal: 16,
        paddingTop: 12
    },
    textArea: {
        width: (windowWidth - 50),
        height: (windowHeight - 44) - 560,
        borderColor: "#286F8B",
        borderWidth: 0.7,
        justifyContent: "center"
    },
    labelStyle: {
        ...theme.h7,
        lineHeight: 25
    },
    profileViewStyle: {
        paddingVertical: 18,
        borderBottomWidth: 0.4,
        borderBottomColor: "#BBBBBB",
        marginHorizontal: 16,
    },
    textStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    subLabelstyle: {
        ...theme.h7
    },
    subTextstyle: {
        flex: 0.5,
        lineHeight: 30,
        ...theme.text.titleSize,
        ...theme.text.textColor,
    },
};

export default styles;
