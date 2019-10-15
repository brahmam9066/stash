import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../components/Toolbar";
import {registerAnimalIcons} from "../../../assets";
import SubTitle from "../../../components/SubTitle";
import SubText from "../../../components/SubText";
import PageDetailsHeader from "../../../components/PageDetailsHeader";
import SearchBar from "../../../components/SearchBar";
import {navigateTo} from "../../../utils/utility";

import styles from "./styles";

import  I18n from "../../../utils/language.utils";

const propTypes =  {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    morphologicalDetails: PropTypes.any,
    morphologicalCurrentDetails: PropTypes.object,
    cattleInseminationDetails: PropTypes.array,
    cattlePregnancyDetails: PropTypes.any,
    cattlePregnancyCurrentDetails: PropTypes.object,
    animalDetails: PropTypes.object,
    permissionsToModify: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    morphologicalDetails: [],
    morphologicalCurrentDetails: {},
    cattleInseminationDetails: [],
    cattlePregnancyDetails: [],
    cattlePregnancyCurrentDetails: {},
    animalDetails: {},
    permissionsToModify: false
};

class AnimalDetails extends Component {

    renderMorphologicalDetails = (data) => {
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

    renderPregnancyDetails = (cattlePregnancyCurrentDetails, insemination, inseminationDate) => (Object.keys(cattlePregnancyCurrentDetails).length > 0
        ? <View>
            <SubText
                text="AI Date"
                value={insemination ? inseminationDate : ""}
                textStyle={styles.textstyle}
                labelStyle={styles.labelstyle}
            />
            <SubText
                text="Days Since AI"
                value={insemination ? moment().diff(insemination.inseminationDate, "days") : ""}
                textStyle={styles.textstyle}
                labelStyle={styles.labelstyle}
            />
            <SubText
                text="Service Type"
                value={cattlePregnancyCurrentDetails &&
                        cattlePregnancyCurrentDetails.inseminations &&
                        cattlePregnancyCurrentDetails.inseminations[0] &&
                        cattlePregnancyCurrentDetails.inseminations[0].inseminationType
                    ? cattlePregnancyCurrentDetails.inseminations[0].inseminationType : ""}
                textStyle={styles.textstyle}
                labelStyle={styles.labelstyle}
            />
            <View>
                <SubText
                    text="Parity"
                    value={cattlePregnancyCurrentDetails && cattlePregnancyCurrentDetails.pregnancyParity ? cattlePregnancyCurrentDetails.pregnancyParity.toString() : ""}
                    textStyle={styles.textstyle}
                    labelStyle={styles.labelstyle}
                />
            </View>
          </View>
        : <Text style={styles.textStyle}>No Record Found</Text>)

    render() {
        const {morphologicalCurrentDetails, cattleInseminationDetails, cattlePregnancyCurrentDetails, animalDetails, language} = this.props;
        // console.log("cattlePregnancyCurrentDetails", cattlePregnancyCurrentDetails);
        const cattleDob = moment(animalDetails.dob);
        const noOfYears = moment(new Date()).diff(cattleDob, "years");
        const {dob} = animalDetails;
        const dateOfBirth = animalDetails.dob;
        const dateFormat = moment(dateOfBirth).format("DD-MM-YYYY");
        const years = moment().diff(dob, "years");
        const months = moment().diff(dob, "months");
        const age = dob !== "" ? `${years}y ${months % 12}m` : "";
        const insemination = (cattlePregnancyCurrentDetails && cattlePregnancyCurrentDetails.inseminations && cattlePregnancyCurrentDetails.inseminations.length > 0)
            ? cattlePregnancyCurrentDetails.inseminations[cattlePregnancyCurrentDetails.inseminations.length - 1] : null;
        const insemDate = insemination ? insemination.inseminationDate : "";
        const inseminationDate = moment(insemDate).format("DD-MM-YYYY");
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView>
                    <SearchBar
                        searchBarStyle={styles.searchbarBackground}
                        language={language} />
                    <View>
                        <PageDetailsHeader
                            iconUsermooOn={registerAnimalIcons.iconProfileHatsun}
                            headerTitle={animalDetails.isPurchased ? "Purchased" : "Farm Bred"} />
                    </View>
                    <View style={styles.informationViewStyle}>
                        <View style={styles.profileViewStyle}>
                            <SubTitle
                                heading= {I18n.t('profileinformation', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                onPressEvent={(e) => { this.props.permissionsToModify ? navigateTo("profileInformation", {isEditProfileInfo: true, comingFrom: "cattleDetails"}) : e.preventDefault(); }}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                // onPressEvent={() => { navigateTo("profileInformation", { isEditProfileInfo: true, comingFrom:"cattleDetails" }); }}
                                // eventTextStyle={styles.eventTextStyle}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('reg_ID', {locale:language})}
                                value={animalDetails.stellaCode ? animalDetails.stellaCode : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('species', {locale:language})}
                                    value={animalDetails.species ? animalDetails.species : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('breed', {locale:language})}
                                    value={animalDetails.breed ? animalDetails.breed : ""}
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
                                    value={dateFormat}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('sireType', {locale:language})}
                                    value={animalDetails.father ? animalDetails.father.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('damType', {locale:language})}
                                    value={animalDetails.mother ? animalDetails.mother.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('gender', {locale:language})}
                                    value={animalDetails.gender ? animalDetails.gender[0].toUpperCase() + animalDetails.gender.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('status', {locale:language})}
                                    value={animalDetails.livestockState ? animalDetails.livestockState[0].toUpperCase() + animalDetails.livestockState.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                        </View>
                        <View style={styles.breedViewStyle}>
                            <SubTitle
                                heading= {I18n.t('breedInformation', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                onPressEvent={(e) => { this.props.permissionsToModify ? navigateTo("breedInformation", {isEditBreedInfo: true, comingFrom: "animalSummary"}) : e.preventDefault(); }}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                // onPressEvent={() => { navigateTo("breedInformation", { isEditBreedInfo: true, comingFrom: "animalSummary" }); }}
                                // eventTextStyle={styles.eventTextStyle}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('lactation', {locale:language})}
                                value={animalDetails.lactationState ? animalDetails.lactationState : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <SubText
                                text= {I18n.t('breedingState', {locale:language})}
                                value={animalDetails.breedingState ? animalDetails.breedingState : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            {/* <SubText
                                text="Number of Calving"
                                value={animalDetails.noOfCalves ? animalDetails.noOfCalves : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            /> */}
                        </View>
                        <View style={styles.breedViewStyle}>
                            <SubTitle
                                heading= {I18n.t('currentPregnancyDetails', {locale:language})}
                                eventTextStyle={styles.eventTextStyle}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            {this.renderPregnancyDetails(cattlePregnancyCurrentDetails, insemination, inseminationDate)}
                        </View>
                        {/* <View style={styles.breedViewStyle}>
                            <SubTitle
                                heading= {I18n.t('morphologicalDetails', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                onPressEvent={(e) => { this.props.permissionsToModify ? navigateTo("morphologicalDetails", {isEditMorphologicalInfo: true, comingFrom: "animalSummary"}) : e.preventDefault(); }}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                // onPressEvent={() => { navigateTo("morphologicalDetails", { isEditMorphologicalInfo: true, comingFrom: "animalSummary" }); }}
                                // eventTextStyle={styles.eventTextStyle}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            {this.renderMorphologicalDetails(morphologicalCurrentDetails)}
                        </View> */}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

AnimalDetails.propTypes = propTypes;

AnimalDetails.defaultProps = defaultProps;

export default AnimalDetails;
