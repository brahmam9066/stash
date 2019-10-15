import React, {Component} from "react";
import {View, BackHandler, SafeAreaView, Text, Image} from "react-native";
import Swiper from "react-native-custom-swiper";
import {bcsImages} from './../../../../assets/index';
import Toolbar from "../../../../components/Toolbar";
import {navigateBack, navigateTo} from "../../../../utils/utility";

import styles from "./styles";

class BCSSwipper extends Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("bodyConditionScore");
        return true;
    }

    constructor(props) {
        super(props);
        this.state = {
            imgArray: [
                bcsImages.bcsOne,
                bcsImages.bcsTwo,
                bcsImages.bcsThree
            ],
            currentIndex: 0,
        };
    }


 // Render Rows
 renderImageSwipeItem = item => {
    return (
        <View>
            <Image style={styles.renderImageView} source={item} resizeMode="contain" />
        </View>
    );
};

screenChange = index => {
    console.log("index when change :=> \n", index);
    this.setState({ currentIndex: index });
};

    render(){
        return(
            <SafeAreaView style={styles.container}>
             <View style={styles.mainView}>
            <Toolbar
                   leftIconName="arrow-left"
                   onPressLeftIcon={navigateBack}
                   title="Body Condition Score" />
            <View style={styles.childView}>
            {this.state.currentIndex === 0 ? (
                <Text style={styles.textBcs}>How to Evaluate BCS?</Text>
                ) : (
                     <Text></Text>
                )}
                 <Text style={styles.textCriticalPoints}>Critical Points for Body Condition Scoring</Text>
              </View>

           <View style={styles.swiperView}>
               <Swiper
                   currentSelectIndex={0}
                   swipeData={this.state.imgArray}
                   renderSwipeItem={this.renderImageSwipeItem}
                   onScreenChange={this.screenChange}
               />
               </View>
               </View>
       </SafeAreaView>
);
    }

}
export default BCSSwipper;