import theme from "../../theme";
import {Dimensions} from 'react-native';

const {width} = Dimensions.get("window");

const styles = {
    appContainer: {
        ...theme.backGroundColor,
        flex: 1
    },
    appContainerImage: {
        // ...theme.backGroundColor,
        flex: 1,
        backgroundColor:'white',
        margin:2
    },
    pageHeaderStyle: {
        ...theme.backWhite,
        elevation: 4
    },
    pageContentStyle: {
        ...theme.backWhite,
        borderBottomColor: "#fafafa",
        marginBottom: 1
    },
    flex_1: {
        flex: 1
    },
    searchBarContStyle: {
        marginTop: 16,
        ...theme.backWhite, 
    },
    searchbarBackground: {
        ...theme.backWhite, 
        borderColor: "#ed1c24",
        borderRadius: 4
    },
    footerStyle: {
        marginTop: 40
    },
    activeTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: "#ed1c24"
    },
    tabIconStyle: {
        width: 70,
        height: 60
    },
    sliderStyle: {
        paddingVertical: 10,
        width: width-10
    },
    sliderViewStyle: {
        alignItems: "center",
        paddingHorizontal: 16,
        width: width
    },
    tabStyle: {
        alignItems: "center",
        padding: 15
    },
    dotColor : {
        backgroundColor:'white',
        width: 10, 
        height: 10,
        borderRadius: 4, 
        marginLeft: 9, 
        marginRight: 9, 
        marginTop: 3, 
        marginBottom: 3
    },
    activeDotColor :{
        backgroundColor: '#ef484e', 
        width: 10, 
        height: 10, 
        borderRadius: 4,
        marginTop: 3, 
        marginBottom: 3,
        marginLeft: 9,
        marginRight: 9
    },
    paginationStyle : {
         alignItems: 'center', 
         justifyContent: 'center', 
         bottom : 15
    },
    imageStyle : { 
        flex: 0.9
    }
};

export default styles;
