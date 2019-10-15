import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity, Image, BackHandler} from "react-native";
import {Button} from "react-native-elements";
import {navigateBack, navigateTo} from "../../../../utils/utility";

import Toolbar from "../../../../components/Toolbar";
import SearchBar from "../../../../components/SearchBar";
import {bwmIcons} from "../../../../assets";
import  I18n from "../../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    bwmForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    bcsDetails: PropTypes.object,
    isEditBwm: PropTypes.bool
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    bwmForm: <Text>BWM Form</Text>,
    handleNextPress: () => {},
    bcsDetails: {},
    isEditBwm: false
};

class BodyWeightMeasurement extends Component<{}> {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("bwmDetails");
        return true;
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        {!this.props.isEditBwm &&
                        <SearchBar
                            handleSearch={this.props.handleSearch}
                            searchList={this.props.searchList}
                            comingFromForScan="bwsOnlineScanRecord"
                            handleSearchItemPress={this.props.handleSearchItemPress} 
                            language={language}/>
                        }
                        {(!this.props.isEditBwm && this.props.stellaCode === "") ?
                            <Text style={styles.noFormTextStyle}>
                            {I18n.t('searchwiththeRegisterationId', {locale:language})}
                            </Text>
                            :
                            <View>
                                <View style={styles.cattleDetailsConteiner}>
                                    <Text
                                        style={styles.labelStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail">
                                        {I18n.t('registrationIdAnimalListing', {locale:language})}
                                        {this.props.stellaCode}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('lactationAnimalListing', {locale:language})}
                                        </Text>{this.props.bcsDetails.lactationState}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('breedingStateColon', {locale:language})}
                                        </Text>{this.props.bcsDetails.breedingState}
                                    </Text>
                                </View>
                                {this.props.bwmForm}
                                <View style={styles.evaluateButton}>
                                    <Text style={styles.evaluateTextStyle}>
                                    {I18n.t('howToEvaluateBwm', {locale:language})}
                                    </Text>
                                </View>
                                <View style={styles.bwmViewStyle}>
                                    <Image source={bwmIcons.bwmIcon} />
                                </View>
                                <Button
                                    raised
                                    title={I18n.t('save', {locale:language})}                 
                                    backgroundColor="#ed1c24"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={this.props.handleNextPress} />
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

BodyWeightMeasurement.defaultProps = defaultProps;

BodyWeightMeasurement.propTypes = propTypes;

export default BodyWeightMeasurement;
