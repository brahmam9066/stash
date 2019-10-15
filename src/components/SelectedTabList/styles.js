import {Dimensions} from "react-native";
import theme from "../../theme";

const {height, width} = Dimensions.get("window");

const styles = {
    row: {
        flexDirection: "row"
    },
    spaceBetween: {
        justifyContent: "space-between"
    },
    paddingHorizontal: {
        padding: height > width ? width * 0.05 : width * 0.1
    },
    tabContentStyle: {
        flex: 1,
        height: height > width ? width * 0.3 : height * 0.3,
        width: height > width ? width * 0.4 : height * 0.4,
        justifyContent: "center",
        alignItems: "center"
    },
    tabContentIconStyle: {
        width: 80,
        height: 90
    },
    tabContentTextStyle: {
        ...theme.text.buttonTextSize,
        ...theme.text.textColor,
        textAlign: "center"
    }
};

export default styles;
