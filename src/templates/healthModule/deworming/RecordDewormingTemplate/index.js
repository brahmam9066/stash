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
    dewormingForm: PropTypes.element,
    handleSubmit: PropTypes.func,
    cattleDetails: PropTypes.object,
    searchList: PropTypes.array,
    handleSearch: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    isShowCattleTab: PropTypes.bool,
    handleSubmitOffline: PropTypes.func,
    isInternetConnected: PropTypes.bool
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    dewormingForm: <Text>Deworming Form</Text>,
    handleSubmit: () => {},
    cattleDetails: {},
    searchList: [],
    handleSearch: () => {},
    handleSearchItemPress: () => {},
    isShowCattleTab: false,
    isInternetConnected: true,
    handleSubmitOffline: () => {}
};

class RecordDeworming extends Component {
    render() {
        const {language}=this.props
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
                        {!this.props.isEditDeworming && this.props.comingFrom !== "dewormingOfflineList" && this.props.isInternetConnected &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                comingFromForScan="dewormingOnlineScanRecord"
                                handleSearchItemPress={this.props.handleSearchItemPress} 
                                language={language}/>
                        }
                        {
                            (!this.props.isInternetConnected  || this.props.comingFrom == "dewormingOfflineList") &&

                            <View>
                            {this.props.offlineInput}
                            <Button
                                raised
                                title="Submit"
                                backgroundColor="#ed1c24"
                                borderRadius={4}
                                containerViewStyle={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                                onPress={this.props.handleSubmitOffline} />
                        </View>
                        }
                        
                        {(!this.props.isEditDeworming && this.props.stellaCode === "" || this.props.comingFrom == "dewormingOfflineList" || !this.props.isInternetConnected ) ?
                        
                       (this.props.comingFrom !== "dewormingOfflineList" && this.props.isInternetConnected)?   <Text style={styles.noFormTextStyle}>
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
                                {this.props.dewormingForm}
                                <Button
                                    raised
                                    title={I18n.t('save', {locale:language})}                  
                                    backgroundColor="#ed1c24"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={this.props.handleSubmit} />
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

RecordDeworming.defaultProps = defaultProps;

RecordDeworming.propTypes = propTypes;

export default RecordDeworming;
