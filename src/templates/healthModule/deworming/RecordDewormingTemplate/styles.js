import {dpToPx} from "../../../../utils/utility";
import theme from "../../../../theme"

const styles = {
    bodyContent: {
        paddingBottom: 16
    },
    heading: {
        paddingHorizontal: 16,
        paddingTop: 10,
        color: "#276F8B",
        fontSize: 18,
        fontWeight: "500"
    },
    buttonStyle: {
        marginLeft: dpToPx(12),
        marginRight: dpToPx(12),
        elevation: 2
    },
    buttonTextStyle: {
        fontWeight: "500",
        fontSize: dpToPx(7)
    },
    flex1: {
        flex: 1
    },
    scrollViewStyle: {
        flexGrow: 1,
        paddingBottom: 20
    },
    cattleDetailsConteiner: {
        paddingVertical: 20,
        marginLeft: 16,
        marginRight: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "#808080"
    },
    noFormTextStyle: {
        textAlign: "center",
        padding: 16,
        fontSize: 16,
        paddingBottom: 20
    },
    labelStyle: {
        ...theme.h7,
        lineHeight: 25
    },
    textStyle: {
        ...theme.text.titleSize,
        ...theme.text.textColor
    }
};

export default styles;
