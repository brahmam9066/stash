import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../components/Toolbar";
import AnimalProfile from "../../../components/AnimalProfile";
import SubTitle from "../../../components/SubTitle";
import SubText from "../../../components/SubText";
import Tabs from "../../../components/Tabs";
import {navigateTo} from "../../../utils/utility";
import SearchBar from "../../../components/SearchBar";
import I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    calfDetails: PropTypes.object,
    morphologicalDetails: PropTypes.any
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    calfDetails: {},
    morphologicalDetails: {}
};

class CalfHeiferDetails extends Component {

    renderMorphologicalDetails = (data) => {
        console.log("data", data);
        return (data && data.cattleMorphologyRecords && data.cattleMorphologyRecords.length > 0
            ? data.cattleMorphologyRecords.map((item, index) => {
                return (
                    <SubText
                        key={index}
                        text={item.name}
                        value={item.value}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle} />
                );
            })
            : <Text style={styles.textStyle}>No Record Found</Text>
        );
    }

    render() {
        const {calfDetails, morphologicalDetails, language} = this.props;
        console.log("morpho", morphologicalDetails);
        const dob = calfDetails.dob ? calfDetails.dob : "";
        const dateOfBirth = moment(dob).format("DD-MM-YYYY");
        const years = moment().diff(dob, "years");
        const months = moment().diff(dob, "months");
        const age = dob !== "" ? `${years}y ${months % 12}m` : "";
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <SearchBar 
                language={language}/>
                <ScrollView>
                    <View style={styles.filterViewContainer}>
                        <AnimalProfile>
                            <View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.labelstyle}>
                                   {I18n.t('registrationIdAnimalListing', {locale:language})}
                                    {calfDetails.stellaCode ? calfDetails.stellaCode : ""}
                                </Text>
                            </View>
                        </AnimalProfile>
                        <View style={styles.rowContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Tabs
                                    tabList={this.props.tabList}
                                    defaultTab={this.props.defaultTab}
                                    handleTabPress={this.props.handleTabPress}
                                    tabIconStyle={styles.tabIconStyle}
                                    tabStyle={styles.tabStyle} />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.listViewContainer}>
                        <View style={styles.summaryViewStyle}>
                            <SubTitle
                                heading= {I18n.t('summary', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                subTitleStyle={styles.subTitleStyle}
                                titleStyle={styles.titlestyle}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                onPressEvent={(e) => { this.props.permissionsToModify ?  navigateTo("profileInformation", {isEditProfileInfo: true, comingFrom: "animalSummary"})  : e.preventDefault() }}
                                />
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('species', {locale:language})}
                                    value={calfDetails.species ? calfDetails.species : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('breed', {locale:language})}
                                    value={calfDetails.breed ? calfDetails.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('age', {locale:language})}
                                    value={age}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('dob', {locale:language})}
                                    value={dateOfBirth}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('sire', {locale:language})}
                                    value={calfDetails.father ? calfDetails.father.stellaCode : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('dam', {locale:language})}
                                    value={calfDetails.mother ? calfDetails.mother.stellaCode : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('sireType', {locale:language})}
                                    value={calfDetails.father ? calfDetails.father.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('damType', {locale:language})}
                                    value={calfDetails.mother ? calfDetails.mother.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                          <View style={styles.flexRowStyle}>
                                <SubText
                                   text= {I18n.t('gender', {locale:language})}
                                   value={calfDetails.gender ? calfDetails.gender[0].toUpperCase() + calfDetails.gender.slice(1).toLowerCase() : ""}
                                   textStyle={styles.textstyle}
                                   labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('status', {locale:language})}
                                    value={calfDetails.livestockState ? calfDetails.livestockState : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                        </View>
                        <View style={styles.breedViewStyle}>
                            <SubTitle
                                heading= {I18n.t('breedInformation', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                subTitleStyle={styles.subTitleStyle}
                                titleStyle={styles.titlestyle}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                onPressEvent={(e) => { this.props.permissionsToModify ? navigateTo("breedInformation", {isEditBreedInfo: true, comingFrom: "animalSummary"}) : e.preventDefault() }}
                            />
                            <View>
                                <SubText
                                    text= {I18n.t('lactation', {locale:language})}
                                    value={calfDetails.lactationState ? calfDetails.lactationState : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('breedingState', {locale:language})}
                                    value={calfDetails.breedingState ? calfDetails.breedingState : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                        </View>
                        <View style={styles.morphologicalView}>
                            <SubTitle
                                heading= {I18n.t('additionalinformation', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                subTitleStyle={styles.subTitleStyle}
                                titleStyle={styles.titlestyle}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                onPressEvent={(e) => { this.props.permissionsToModify ? navigateTo("morphologicalDetails", {isEditMorphologicalInfo: true, comingFrom: "animalSummary"}) : e.preventDefault() }}
                            />
                            {this.renderMorphologicalDetails(this.props.morphologicalDetails)}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

CalfHeiferDetails.propTypes = propTypes;

CalfHeiferDetails.defaultProps = defaultProps;

export default CalfHeiferDetails;
