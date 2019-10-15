import {Dimensions} from "react-native";


const {width, height} = Dimensions.get("window");
const windowWidth = width;
const windowHeight = height;

const styles = {
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    mainView: {
        flex:1
    },
    childView : {
        flex:0.1
    },
    textBcs :{
        paddingLeft:10,
        padding:4,
        marginTop:6,
        fontSize:18, 
        fontWeight: "800",
        color:"black"
    },
    textCriticalPoints :{
        paddingLeft:10,
        fontSize:14,
        fontWeight:"600"
    },
    swiperView : {
        flex:0.8
    },
    renderImageView :{ 
        paddingTop:1,
        backgroundColor:"#fff",
        width:411,
        height:350,
        flex:1
    },


   
};

export default styles;