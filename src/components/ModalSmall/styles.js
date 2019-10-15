import theme from "../../theme";

const styles = {
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 28,
        justifyContent: "center",
        alignItems: "center"
    },
    modalWrapper: {
        width: "100%",
        height: "auto",
        ...theme.backWhite,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16
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
    }
};

export default styles;
