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
    calfBirthForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    stellaCode: PropTypes.string,
    isEditCalfBirth: PropTypes.bool,
    cattleDetails: PropTypes.object
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    calfBirthForm: <Text>calfBirth Form</Text>,
    handleNextPress: () => {},
    handleSearchItemPress: () => {},
    handleSearch: () => {},
    searchList: [],
    stellaCode: "",
    isEditCalfBirth: false,
    cattleDetails: {}
};

class CalfBirth extends Component<{}> {

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
                        {!this.props.isEditCalfBirth && this.props.comingFrom !== "calfBirthOfflineList" && this.props.isInternetConnected &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                comingFromForScan="calfBirthOnlineScanRecord"
                                handleSearchItemPress={this.props.handleSearchItemPress} 
                                language={language}/>
                        }
                        {
                            (!this.props.isInternetConnected  || this.props.comingFrom == "calfBirthOfflineList") &&

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
                        {(!this.props.isEditCalfBirth && this.props.stellaCode === "" || this.props.comingFrom == "pdOfflineList" || !this.props.isInternetConnected) ?
                         (this.props.comingFrom !== "aiOfflineList" && this.props.isInternetConnected) ?   <Text style={styles.noFormTextStyle}>
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
                                {this.props.calfBirthForm}
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

CalfBirth.defaultProps = defaultProps;

CalfBirth.propTypes = propTypes;

export default CalfBirth;
