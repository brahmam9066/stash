import React from "react";
import { View, Text, Image, ScrollView, BackHandler } from "react-native";
import Toolbar from "../Toolbar";
import {navigateBack} from "../../utils/utility";
import {aboutUs} from "../../assets"
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
                    title={"About Us"} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    <Image style={styles.image} source={aboutUs.aboutUsImage}/>
                    <Text style={styles.heading}>
                        About Stellapps
                    </Text>
                    <Text style={styles.subTitle}>
                        Stellapps is an end-to-end dairy technology solutions company.
                    </Text>
                    <Text style={styles.textContent}>
                        Started in the year 2011, it is the first of its kind in India. 
                        We produce and procure comprehensive farm optimization and monitoring support,
                        which helps dairy farmers and cooperatives maximize profits while minimizing effort. 
                    </Text>
                    <Text style={styles.textContent}>
                        Our innovative applications and state-of-the-art mechanization tools leverage Internet of Things (IoT), 
                        Big Data, Cloud, Mobility, and Data Analytics to improve Agri- supply chain parameters, 
                        including milk production, milk procurement, cold chain, animal insurance and farmer payments. 
                    </Text>
                    <Text style={styles.textContent}>
                        Our SmartMoo™ IoT router and in-premise IoT Controller acquire data via sensors that are embedded in Milking Systems, 
                        Animal Wearables, Milk Chilling Equipment {"&"} Milk Procurement Peripherals, 
                        and transmit the same to the Stellapps SmartMoo™ Big Data Cloud Service Delivery Platform (SDP) 
                        where the SmartMoo™ suite of applications analyse and crunch the received data before disseminating the
                        Analytics {"&"} Data Science outcome to various stakeholders over low-end and smart mobile devices. 
                        The patent pending hardware and software is designed to scale horizontally across other industry verticals. 
                    </Text>
                    <Text style={styles.textContent}>
                        The SmartMoo™ Cloud is capable of supporting data arising out of tens of millions of liters of milk through 
                        the milk production, procurement and cold chain flow across millions of farmers.
                    </Text>
                </ScrollView>
            </View>
        );
    }
}