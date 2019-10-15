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
        flexDirection: "row",
        paddingTop: 10
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
    width1002: {
        width: "100%",
        paddingHorizontal: 16,
        marginBottom:15
    },
    width1001: {
        width: "100%",
        padding: 16,
        borderBottomColor:'#f0f0f0', 
        borderBottomWidth: 20,
        marginBottom:10  
    },
    textArea: {
        width: (windowWidth - 50),
        height: (windowHeight - 44) - 560,
        borderColor: "#286F8B",
        borderWidth: 0.7,
        justifyContent: "center"
    },
    eventTextStyle: {
        lineHeight: 30,
        ...theme.linkColor,
        paddingTop: 30
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titlestyle: {
        ...theme.h7,
        lineHeight: 30
    },
    calfHash: {
        fontWeight: "bold",
        color: 'black',
        paddingHorizontal: 16,
        padding: 3
    },
    calfStyle: {
        paddingHorizontal: 16,
        width: "100%",
        borderTopColor:'#f0f0f0', 
        borderTopWidth: 20,
        marginTop:10  
    },
    errorText: {
        ...theme.linkColor
    }
};

export default styles;
