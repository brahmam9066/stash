import {Dimensions} from "react-native";
import theme from "../../theme";

const {width} = Dimensions.get("window");
const windowWidth = width;

const styles = {
    pageDetailsHeader: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#d7d7d7"
    },
    avatarStyle: {
        width: 120,
        height: 120
    },
    headerContent: {
        width: (windowWidth - 32) - 120,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTitle: {
        paddingLeft: 24,
        ...theme.text.font22,
        ...theme.text.textColor,
        ...theme.headWeight,
        width: (windowWidth - 32) - 160
    },
    editTextStyle: {
        ...theme.linkColor,
        ...theme.text.titleSize,
        width: 40,
        textAlign: "right"
    },
    editButtonCont: {
        justifyContent: "center"
    }
};

export default styles;
