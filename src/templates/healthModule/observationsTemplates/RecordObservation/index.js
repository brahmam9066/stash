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
    recordObservationForm: PropTypes.element,
    clinicalFindingsForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    searchList: PropTypes.array,
    handleSearch: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    stellaCode: PropTypes.string,
    cattleDetails: PropTypes.object,
    isEditTreatment: PropTypes.bool
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    recordObservationForm: <Text>Breed Form</Text>,
    clinicalFindingsForm: <Text>Pregnancy Form</Text>,
    handleNextPress: () => {},
    searchList: [],
    handleSearch: () => {},
    handleSearchItemPress: () => {},
    stellaCode: "",
    cattleDetails: {},
    isEditTreatment: false
};

class RecordObservation extends Component<{}> {

    render() {
        const {language} = this.props;
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle}
                    showAlert={this.props.showAlert}
                    alertTitle={this.props.alertTitle}
                    />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        {!this.props.isEditTreatment && this.props.comingFrom !== "observationOfflineList" && this.props.isInternetConnected &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                comingFromForScan="observationOnlineScanRecord"
                                handleSearchItemPress={this.props.handleSearchItemPress}
                                searchBarStyle={styles.searchbarBackground}
                                containerStyle={styles.searchBarContStyle} 
                                language={language}/>
                        }
                        {
                            (!this.props.isInternetConnected  || this.props.comingFrom == "observationOfflineList") &&

                            <View>
                            {this.props.offlineInput}
                            <Text style={[styles.h6, styles.paddingHorizontal16]}>Clinical Findings</Text>
                            {this.props.clinicalFindingsForm}
                            <Button
                                raised
                                title={I18n.t('next', {locale:language})}                  
                                backgroundColor="#ed1c24"
                                borderRadius={4}
                                containerViewStyle={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                                onPress={this.props.handleSubmitOfflineStellaCode} />
                        </View>
                        }

                        {(!this.props.isEditDehorning && this.props.stellaCode === "" || this.props.comingFrom == "observationOfflineList" || !this.props.isInternetConnected) ?
                        
                        (this.props.comingFrom !== "observationOfflineList" && this.props.isInternetConnected)?   <Text style={styles.noFormTextStyle}>
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

                                </View>
                                <Text style={[styles.h6, styles.paddingHorizontal]}>Physical Inspection</Text>
                                {this.props.recordObservationForm}
                                <Text style={[styles.h6, styles.paddingHorizontal16]}>Clinical Findings</Text>
                                {this.props.clinicalFindingsForm}
                                <Button
                                    raised
                                    title={this.props.keyFrom ? 
                                        I18n.t('save', {locale:language})                    
                                        : 
                                        I18n.t('next', {locale:language})
                                    }
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

RecordObservation.defaultProps = defaultProps;

RecordObservation.propTypes = propTypes;

export default RecordObservation;
