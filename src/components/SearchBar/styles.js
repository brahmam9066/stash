const styles = {
    container: {
        flex: 1
    },
    searchBarCont: {
        backgroundColor: "#f0494f",
        paddingHorizontal: 24,
        paddingVertical: 16
    },

    searchFieldWrapper: {
        paddingVertical: 4,
        borderWidth: 0.7,
        borderColor: "#def5f3",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 4
    },
    inputboxStyle: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 14,
        backgroundColor: "#ffffff"
    },
    searchIconStyle: {
        paddingHorizontal: 8,
        borderRightWidth: 2,
        borderRightColor: "#666666",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 7
    },
    qrcodeStyle: {
        paddingHorizontal: 16
    },
    autocompleteListContainer: {
        position: "absolute",
        top: 91,
        width: "100%",
        zIndex: 9999999,
        paddingHorizontal: 24
    },
    autoCompleteContent: {
        backgroundColor: "#ffffff",
        elevation: 3
    },
    listItemCont: {
        padding: 16,
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ffffff",
        backgroundColor: "#ffffff"
    },
    qrcodeContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    nearMeListItemCont: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ffffff",
        backgroundColor: "#ffffff",
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    nearMeListItemText: {
        flex: 1,
        fontSize: 12
    },
    locationIcon: {
        height: 35,
        width: 35
    }
};

export default styles;
