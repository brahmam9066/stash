import React from "react";
import { View, Text, Image, ScrollView, BackHandler, TouchableOpacity, Linking } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Toolbar from "../Toolbar";
import { navigateBack } from "../../utils/utility";
import styles from "./styles";

export default class AboutUs extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("dashboard");
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.handleBackPress}
                    title={"Call Us"} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.heading}>
                        Let's get in touch
                    </Text>
                    <Text style={styles.subTitle}>
                        If you got any questions, please do not hesitate to send us a message.
                    </Text>
                    <View style={styles.emailContainer}>
                        <TouchableOpacity onPress={() => {Linking.openURL("mailto:info@stellapps.com")}}>
                            <Text style={styles.email}>
                                info@stellapps.com
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {Linking.openURL("mailto:sales@stellapps.com")}}>
                            <Text style={styles.email}>
                                sales@stellapps.com
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={{paddingVertical: 10, paddingRight: 10}} onPress={() => {Linking.openURL("https://www.facebook.com/stellapps")}}>
                            <Icon name="facebook" size={30} color="#EF484E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => {Linking.openURL("https://www.linkedin.com/company/stellapps-technologies-private-limited/")}}>
                            <Icon name="linkedin" size={30} color="#EF484E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => {Linking.openURL("https://twitter.com/stellapps")}}>
                            <Icon name="twitter" size={30} color="#EF484E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 10}} onPress={() => {Linking.openURL("https://www.youtube.com/channel/UCBUXSFZYjCVJdeR1EjfzNLA")}}>
                            <Icon name="youtube" size={30} color="#EF484E" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}