import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import Toolbar from "../../../../components/Toolbar";
import SearchBar from "../../../../components/SearchBar";
import  I18n from "../../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    milkLogCollectionForm: PropTypes.element,
    milkLogQualityMeasurementForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    isEditMilkLog: PropTypes.bool,
    stellaCode: PropTypes.string,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleSearchItemPress: PropTypes.func,
    cattleDetails: PropTypes.object
};

const defaultProps = {
    onbackPress: () => { },
    toolbarTitle: "",
    milkLogCollectionForm: <Text>Milk Collection Form</Text>,
    milkLogQualityMeasurementForm: <Text>Milk Quality Measurement Form</Text>,
    handleNextPress: () => { },
    isEditMilkLog: false,
    stellaCode: "",
    handleSearch: () => {},
    searchList: [],
    handleSearchItemPress: () => {},
    cattleDetails: {}
};

class BodyWeightMeasurement extends Component {

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
                        {!this.props.isEditMilkLog && this.props.stellaCode === "" &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                handleSearchItemPress={this.props.handleSearchItemPress} 
                                language={language}/>
                        }
                        {(!this.props.isEditMilkLog && this.props.stellaCode === "") ?
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
                                        </Text>
                                        {this.props.cattleDetails.lactationState ? this.props.cattleDetails.lactationState : ""}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('breedingStateColon', {locale:language})}
                                        </Text>
                                        {this.props.cattleDetails.breedingState ? this.props.cattleDetails.breedingState : ""}
                                    </Text>
                                </View>
                                <Text style={[styles.h6, styles.paddingHorizontal]}>
                                {I18n.t('recordMilkLog', {locale:language})}
                                </Text>
                                {this.props.milkLogCollectionForm}
                                <Text style={[styles.h6, styles.paddingHorizontal]}>
                                {I18n.t('qualityMeasurements', {locale:language})}
                                </Text>
                                {this.props.milkLogQualityMeasurementForm}
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
