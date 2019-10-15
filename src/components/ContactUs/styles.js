import theme from "../../theme"

export default styles = {
    container: {
        flex: 1,
        ...theme.backWhite,
    },
    scrollContainer: {
        paddingVertical: 25,
        paddingHorizontal: 25
    },
    image: {
        height:200,
        width: "100%"
    },
    heading: {
        marginTop: 20,
        fontSize: 30,
        color: "#58595B",
        fontWeight: "700"
    },
    subTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    textContent: {
        marginTop: 10,
        fontSize: 15
    },
    emailContainer: {
        marginTop: 20
    },
    email: {
        marginVertical: 4,
        fontSize: 15,
        color: "#ED1C24"
    },
    iconContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    imageWrapper: {
        padding: 10
    }
}