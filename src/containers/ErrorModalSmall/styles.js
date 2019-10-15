import theme from "../../theme";

const styles = {
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 32,
        justifyContent: "center",
        alignItems: "center"
    },
    modalWrapper: {
        width: "100%",
        height: "auto",
        ...theme.backWhite,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    modalTitle: {
        ...theme.modalTitle,
        paddingBottom: 20
    },
    modalContent: {
        ...theme.modalBody
    },
    buttonCont: {
        paddingTop: 24,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    cancelButton: {
        ...theme.cancelButtonColor,
        fontSize: 18
    },
    agreeButton: {
        ...theme.linkColor,
        fontSize: 18
    },
    errorTextStyle: {
        ...theme.modalBody,
        textAlign: "center"
    },
    cancelIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        backgroundColor: "#ffffff"
    },
    cancelIconText: {
        fontSize: 18
    },
    imageStyle: {
        width: 200,
        height: 150
    },
    boldText: {
        fontWeight: "500"
    }
};

export default styles;
