import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");
const windowWidth = width;
const windowHeight = height;

const styles = {
    appContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
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
    textArea: {
        width: (windowWidth - 50),
        height: (windowHeight - 44) - 560,
        borderColor: "#286F8B",
        borderWidth: 0.7,
        justifyContent: "center"
    },
    h6: {
        color: "#757678",
        fontSize: 18,
        fontWeight: "500",
        paddingHorizontal: 16,
        paddingBottom: 15
    },
    errorText: {
        color: "#ed1c24"
    },
    labelText: {
        fontSize: 15
    }
};

export default styles;
