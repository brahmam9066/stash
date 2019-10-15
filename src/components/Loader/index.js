/**
* @author 
* @version 1.0.2
* @summary Custom Loader component.
* @description A custom buttopn component is being made so that it can be used everywhere..
*/


import {ActivityIndicator, Modal, Text, StatusBar, View,Image} from "react-native";
import {connect} from "react-redux";
import React, {Component} from "react";

/**
* @import componentstyles object. This object have all the styles written for the screens.
* the styles have been defined in a file named "componentStyles" which is again importing
* an object from theme file when our theme related styles have been defined.
*/
import styles from "./styles";

class Loaderer extends Component<{}> {

    render() {
        if(this.props.loaderer) {
            return(
                <View style={styles.modalContainer}>
                    <View style={styles.modalDesign}>
                        <View style={styles.modalCont}>
                            <Image source={require("../../assets/loader2.gif")} style={{height:200,width:200}}/>
                          
                           {/* <Image source={require("../../assets/images/Loader-Blue-Circle1.gif")} style={{height:110,width:110}}/> */}
                            {/* <ActivityIndicator 
                            size="large"
                            color="red"/> */}
                        </View>
                    </View>
                </View>
            );
        }
        return(
            <View></View>
        );
    }
}

const mapStateToProps = state => ({
    loaderer: state.searchReducer.loaderer
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Loaderer);
