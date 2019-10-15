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
        paddingVertical: 20
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
    width100Padd: {
        width: "100%",
        paddingHorizontal: 16,
        paddingTop:10
    },
    textArea: {
        width: (windowWidth - 50),
        height: (windowHeight - 44) - 560,
        borderColor: "#286F8B",
        borderWidth: 0.7,
        justifyContent: "center"
    },
    textstyle: {
        flex: 0.5,
        lineHeight: 28,
        ...theme.text.textColor,
        ...theme.text.titleSize
    },
    labelStyle: {
        ...theme.h8,
        lineHeight: 28
    },
    cattleConteiner: {
        paddingBottom: 10,
        borderBottomWidth: 0.6,
        borderBottomColor: "#BBBBBB",
        marginHorizontal: 16
    },
    errorText: {
        ...theme.linkColor
    },
};

export default styles;
