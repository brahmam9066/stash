import theme from "../../theme";

export default styles = {
    container: {
        flexDirection: "row"
    },
    imagesWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    image: {
        height: 60,
        width: 60
    },
    iconXContainer: {
        height: 30,
        width: 30,
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 999
    },
    flex1: {
        flex: 1,
        height: "100%",
        width: "100%"
    },
    progressiveLoaderContainer: {
        position: "absolute",
        top: 15,
        left: 15
    },
    subTitleStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titlestyle: {
        ...theme.h6,
        lineHeight: 30
    },
    titleContainer: {
        paddingHorizontal: 15
    }
}