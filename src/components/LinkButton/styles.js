import {dpToPx} from "../../utils/utility";
import theme from "../../theme";

const styles = {
    linkButtonTextStyle: {
        fontSize: dpToPx(4),
        paddingVertical: dpToPx(4),
        paddingHorizontal: dpToPx(5),
        ...theme.linkColor
    }
};

export default styles;
