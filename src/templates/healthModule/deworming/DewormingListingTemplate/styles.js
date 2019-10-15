import {Dimensions} from "react-native";
import theme from "../../../../theme";

const {width, height} = Dimensions.get("window");

const styles = {
    container: {
        backgroundColor: "#f0f0f0",
        marginBottom: 50
    },
    filterViewContainer: {
        ...theme.backWhite,
        borderBottomWidth: 1,
        borderColor: "#bbbbbb",
       // paddingVertical: 18
    },
    filterBoxStyle: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 18
    },
    listViewContainer: {
        backgroundColor: "#ffffff"
    },
    imageStyle: {
        width: 70,
        height: 70
    },
    // boxStyle: {
    //     flexDirection: "row",
    //     width: (width - 40) / 3,
    //     height: 40,
    //     borderColor: "#dddddd",
    //     borderWidth: 1,
    //     justifyContent: "center"
    // },
    boxStyle: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 0.7,
        borderRadius: 2
    },
    textStyle: {
        ...theme.text.buttonTextSize,
        ...theme.text.textColor,
        alignSelf: "center",
        paddingHorizontal: 5
    },
    boxBorderNoLeft: {
        borderLeftWidth: 0
    },
    boxBorderNoRight: {
        borderRightWidth: 0
    },
    backgroundGrey: {
        backgroundColor: "#f0f0f0"
    },
    backgroundWhite: {
        backgroundColor: "#ffffff"
    },
    boxViewContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 2,
        backgroundColor: "#ffffff",
    },
    titleStyle: {
        color: "#58595B"
    },
    headingStyle: {
        fontWeight: "500"
    },
    boxTextStyle: {
        alignSelf: "center",
        fontSize: 14,
        color: "#58595B"
    },
    marginTop20: {
        marginTop: 20
    },
    mainContainer: {
        flex: 1
    },
    emptyMessageStyle: {
        alignSelf: "center",
        paddingVertical: 140,
        height: 80,
        width: 80
    },
    layoutView: {
        zIndex: 999
    },
    linkView: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "#ffffff"
    },
    linkStyle: {
        marginVertical: 22,
        marginHorizontal: 14,
        backgroundColor: "#f0494f",
        alignSelf: "flex-end",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: 7,
    },
    linkTextStyle: {
        color: "#ffffff",
        fontSize: 14
    },
    disableBackgroundColor: {
        backgroundColor: "#BBBBBB"
    },
    enableBackgroundColor: {
        backgroundColor: "#f0494f"
    }
};
export default styles;
