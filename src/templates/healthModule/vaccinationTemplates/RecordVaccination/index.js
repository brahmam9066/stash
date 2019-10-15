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
    vaccinationForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    stellaCode: PropTypes.string,
    isEditVaccination: PropTypes.bool,
    cattleDetails: PropTypes.object,
    handleSubmitOfflineStellaCode: PropTypes.func,
    offlineInput: PropTypes.element,
    isInternetConnected: PropTypes
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    vaccinationForm: <Text>Breed Form</Text>,
    handleNextPress: () => {},
    handleSearchItemPress: () => {},
    handleSearch: () => {},
    searchList: [],
    stellaCode: "",
    isEditVaccination: false,
    cattleDetails: {},
    handleSubmitOfflineStellaCode: () => {},
    offlineInput: <Text>Breed Form</Text>,
    isInternetConnected: true
};

class RecordVaccination extends Component<{}> {

    render() {
        const {language} = this.props
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle}
                    showAlert={this.props.showAlert}
                    alertTitle={this.props.alertTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        {!this.props.isEditVaccination && this.props.comingFrom !== "vaccinationOfflineList" && this.props.isInternetConnected &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                comingFromForScan="vaccinationOnlineScanRecord"
                                handleSearchItemPress={this.props.handleSearchItemPress} 
                                language={language}/>}
                        {
                            (!this.props.isInternetConnected || this.props.comingFrom == "vaccinationOfflineList") &&
                            <View>
                                {this.props.offlineInput}
                                <Button
                                    raised
                                    title="Submit"
                                    backgroundColor="#ed1c24"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={this.props.handleSubmitOfflineStellaCode} />
                            </View>
                        }
                        {(!this.props.isEditVaccination && this.props.stellaCode === "" || this.props.comingFrom == "vaccinationOfflineList" || !this.props.isInternetConnected) ?

                        (this.props.comingFrom !== "vaccinationOfflineList" && this.props.isInternetConnected)

                           ? <Text style={styles.noFormTextStyle}>
                          {I18n.t('searchwiththeRegisterationId', {locale:language})}
                           </Text> : <View></View>
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
                                    {
                                        this.props.isInternetConnected &&
                                        <>
                                            <Text
                                                style={styles.textStyle}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                                {I18n.t('lactationAnimalListing', {locale:language})}
                                                </Text>{this.props.cattleDetails.lactationState}
                                            </Text>
                                            <Text
                                                style={styles.textStyle}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                                {I18n.t('breedingStateColon', {locale:language})}
                                                </Text>{this.props.cattleDetails.breedingState}
                                            </Text>
                                        </>
                                    }
                                </View>
                                {this.props.vaccinationForm}
                                <Button
                                    raised
                                    title={I18n.t('save', {locale:language})}                 
                                    backgroundColor="#ed1c24"
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

RecordVaccination.defaultProps = defaultProps;

RecordVaccination.propTypes = propTypes;

export default RecordVaccination;
