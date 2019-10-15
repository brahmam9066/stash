import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import Toolbar from "../../../../components/Toolbar";
import SearchBar from "../../../../components/SearchBar";
import SubText from "../../../../components/SubText";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    PDForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    stellaCode: PropTypes.string,
    isEditDehorning: PropTypes.bool,
    cattleDetails: PropTypes.object,
    currentInsemination: PropTypes.object,
    status: PropTypes.string,
    handleSaveAndPerformAi: PropTypes.func
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    PDForm: <Text>PD Form</Text>,
    handleNextPress: () => {},
    handleSearchItemPress: () => {},
    handleSearch: () => {},
    searchList: [],
    stellaCode: "",
    isEditDehorning: false,
    cattleDetails: {},
    currentInsemination: {},
    status: "",
    handleSaveAndPerformAi: () => {}
};

class RecordPD extends Component<{}> {

    render() {
        const {language} =  this.props
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        {this.props.comingFrom !== "pdOfflineList" && this.props.isInternetConnected &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                comingFromForScan="pdOnlineScanRecord"
                                language={language}
                                handleSearchItemPress={this.props.handleSearchItemPress} />
                        }
                        {
                            (!this.props.isInternetConnected  || this.props.comingFrom == "pdOfflineList") &&

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
                        {(!this.props.isEditDehorning && this.props.stellaCode === "" || this.props.comingFrom == "pdOfflineList" || !this.props.isInternetConnected) ?
                           (this.props.comingFrom !== "pdOfflineList" && this.props.isInternetConnected) ? <Text style={styles.noFormTextStyle}>
                           {I18n.t('searchwiththeRegisterationId', {locale:language})}
                           </Text> :<View></View>
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
                                <View style={styles.aIViewStyle}>
                                    <SubText
                                        text={I18n.t('aiDoneDate', {locale:language})}
                                        value={this.props.currentInsemination.inseminationDate}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.textstyle}
                                    />
                                </View>
                                {this.props.PDForm}
                                <Button
                                    raised
                                    title={I18n.t('save', {locale:language})}                 
                                    backgroundColor="#ed1c24"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonStyle}
                                    textStyle={styles.buttonTextStyle}
                                    onPress={this.props.handleNextPress} />
                                {(this.props.status !== "" && this.props.status !== "Pregnant") && <Button
                                    raised
                                    title="Save & Perform AI"
                                    backgroundColor="#ffffff"
                                    borderRadius={4}
                                    containerViewStyle={styles.buttonPerformStyle}
                                    textStyle={styles.buttonTextPerformStyle}
                                    onPress={this.props.handleSaveAndPerformAi} />}
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

RecordPD.defaultProps = defaultProps;

RecordPD.propTypes = propTypes;

export default RecordPD;
