const styles = {
    alertContainer: {
        elevation: 8,
        backgroundColor: "#ed1c24",
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ffffff"
    },
    alertWrapper: {
        flexDirection: "row"
    },
    textStyle: {
        color: "#ffffff",
        fontSize: 16,
        paddingLeft: 16
    },
    cancelIconStyle: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: "#ffffff",
        color: "#000000",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16
    },
    cancelIconContainer: {
        width: 35,
        height: 35,
        position: "absolute",
        right: 8,
        zIndex: 999999,
        justifyContent: "center",
        alignItems: "center"
    }
};

export default styles;
