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
        paddingVertical: 28
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
    textArea: {
        width: (windowWidth - 50),
        height: (windowHeight - 44) - 560,
        borderColor: "#286F8B",
        borderWidth: 0.7,
        justifyContent: "center"
    },
    errorText: {
        ...theme.linkColor
    },
    labelText: {
        ...theme.text.buttonTextSize,
        ...theme.text.textColor
    },
    labelText: {
        fontSize: 15
    }
};

export default styles;
