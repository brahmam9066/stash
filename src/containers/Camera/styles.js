import {Dimensions} from "react-native";

const {height, width} = Dimensions.get("window");
const maskRowHeight = Math.round((height - 300) / 20);
const maskColWidth = (width - 300) / 2;

const styles = {
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
       // justifyContent: "flex-end",
       // alignItems: "center"
    },
    logoViewStyle: {
        flex: 1,
        alignSelf: "center",
        position: "absolute",
        top: 100
    },
    torchStyle: {
        width: 30,
        height: 30
    },
    torchViewStyle: {
        // alignItems: "flex-end",
        justifyContent: "center",
        position: "absolute",
       // alignSelf: "center",
        zIndex: 999,
        top: 0,
        right: 6,
        bottom: 0
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      maskInner: {
        width: width-70,
        backgroundColor: 'transparent',
        borderColor: "#ed1c24",
        borderWidth: 2,
      },
      maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
      },
      maskRow: {
        width: '100%',
      },
      maskCenter: { 
          flexDirection: 'row' 
      },
      flex30: {
        flex: 30
      },
      flexRowHeight: {
        flex: maskRowHeight
      },
      flexColWidth: {
        flex: maskColWidth
      }
};

export default styles;
