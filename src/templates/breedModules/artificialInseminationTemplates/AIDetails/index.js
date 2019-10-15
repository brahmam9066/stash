import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import {navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import SingleImageUpload from "../../../../components/SingleImageUpload";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    aIDetails: PropTypes.object,
    animalDetails: PropTypes.object,
    permissionsToModify: PropTypes.bool,
    enableBilling: PropTypes.bool,
    latestPregnancy: PropTypes.object,
    latestInsemination: PropTypes.object,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func,
    isShowImages: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    aIDetails: {},
    animalDetails: {},
    permissionsToModify: false,
    enableBilling: false,
    latestPregnancy: {},
    latestInsemination: {},
    activateBackButton: () => {},
    deactivateBackButton: () => {},
    isShowImages: false
};

class AIDetails extends Component {

    renderPdList = (aIDetails) => {
        const {language}=this.props
        let canPerformPD = false;
        if (this.props.animalDetails
            && (this.props.animalDetails.breedingState === "Open Bred"
              || this.props.animalDetails.breedingState === "Pregnant"
            )) {
            canPerformPD = true;
        }

        if (aIDetails && aIDetails.pdInspections && aIDetails.pdInspections.length > 0) {
            return aIDetails.pdInspections.map((value, index) => {
                if (index === 0) {
                    return (
                        <View key={index} style={styles.pdStyle}>
                            {canPerformPD ?
                                <SubTitle
                                    heading= {I18n.t('pdDetails', {locale:language})}
                                    eventText= {I18n.t('performPd', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                    onPressEvent={(e) => {
                                        this.props.permissionsToModify ?
                                            navigateTo("recordPD", {animalDetails: this.props.animalDetails, comingFrom: "aiDetails"})
                                            : e.preventDefault();
                                    }}
                                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                /> :
                                <SubTitle
                                    heading= {I18n.t('pdDetails', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                            }
                            <SubText
                                text= {I18n.t('pdCheckDate', {locale:language})}
                                value={aIDetails.pdInspections[index].actualDate && moment(aIDetails.pdInspections[index].actualDate.slice(0, 10)).format("DD-MM-YYYY")}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelStyle}
                            />
                            <SubText
                                text= {I18n.t('result', {locale:language})}
                                value={aIDetails.pdInspections[index].result}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelStyle}
                            />
                        </View>);
                }
                return (
                    <View key={index} style={styles.pdStyle}>
                        <SubTitle
                            heading= {I18n.t('pdDetails', {locale:language})}
                            titleStyle={styles.titlestyle}
                            subTitleStyle={styles.subTitleStyle}
                        />
                        <SubText
                            text= {I18n.t('pdCheckDate', {locale:language})}
                            value={moment(aIDetails.pdInspections[index].actualDate.slice(0, 10)).format("DD-MM-YYYY")}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelStyle}
                        />
                        <SubText
                            text= {I18n.t('result', {locale:language})}
                            value={aIDetails.pdInspections[index].result}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelStyle}
                        />
                    </View>);
            });
        }
        return (
            <View style={styles.pdStyle}>
                <SubTitle
                    heading= {I18n.t('pdDetails', {locale:language})}
                    eventText= {I18n.t('performPd', {locale:language})}
                    titleStyle={styles.titlestyle}
                    subTitleStyle={styles.subTitleStyle}
                    // eventTextStyle={styles.eventTextStyle}
                    onPressEvent={(e) => { this.props.permissionsToModify ? navigateTo("recordPD", {animalDetails: this.props.animalDetails, comingFrom: "aiDetails"}) : e.preventDefault(); }}
                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                    // onPressEvent={() => { navigateTo("recordPD", {animalDetails: this.props.animalDetails, comingFrom: "aiDetails"}); }}
                />
                <Text style={styles.noRecordsText}>No Records Found</Text>
            </View>
        );
    }

    render() {
        const {aIDetails, latestPregnancy, latestInsemination, language} = this.props;
        console.log(aIDetails, "aIDetails");
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={styles.bodyContent}>
                    <ScrollView>
                        <View>
                            <View style={styles.cattleDetailsConteiner}>
                                <Text
                                    style={styles.labelStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {I18n.t('registrationIdAnimalListing', {locale:language})}
                                    {this.props.animalDetails.stellaCode ? this.props.animalDetails.stellaCode : ""}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text>{this.props.animalDetails.lactationState ? this.props.animalDetails.lactationState : ""}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text>{this.props.animalDetails.breedingState ? this.props.animalDetails.breedingState : ""}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.profileViewStyle}>
                                <SubTitle
                                    heading= {I18n.t('summary', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                                <SubText
                                    text= {I18n.t('lastCalvingDate', {locale:language})}
                                    value={latestPregnancy.toDate ? moment(latestPregnancy.toDate, "YYYY-MM-DD").format("DD-MM-YYYY") : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                                <SubText
                                    text= {I18n.t('lastHeatDate', {locale:language})}
                                    value={latestPregnancy.toDate ? moment(latestInsemination.inseminationDate, "YYYY-MM-DD").format("DD-MM-YYYY") : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                            </View>
                        </View>

                        <View style={styles.informationViewStyle}>
                            <View style={styles.detailsViewStyle}>
                                <SubTitle
                                    heading= {I18n.t('details', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                                <View style={styles.flexRowStyle}>
                                    <SubText
                                        text= {I18n.t('aiDate', {locale:language})}
                                        value={aIDetails.inseminationDate ? moment(aIDetails.inseminationDate).format("DD-MM-YYYY") : ""}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text= {I18n.t('pdCheckDue', {locale:language})}
                                        value={aIDetails.expectedPdFollowpDate ? moment(aIDetails.expectedPdFollowpDate).format("DD-MM-YYYY") : ""}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <SubText
                                        text= {I18n.t('serviceType', {locale:language})}
                                        value={aIDetails.inseminationType}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text= {I18n.t('doneBy', {locale:language})}
                                        value={aIDetails.performedBy}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <SubText
                                        text= {I18n.t('semenId', {locale:language})}
                                        value={aIDetails.semenCode}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text= {I18n.t('status', {locale:language})}
                                        value={aIDetails.status}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                            </View>
                        </View>
                        {
                            this.props.enableBilling ?
                                <View style={styles.clinicalFindingsViewContainer}>
                                    <View style={styles.clinicalFindingsViewSubContainer}>
                                        <View style={styles.treatmentCostContainerStyle}>
                                            <Text style={styles.treatmentTextCostTitle}>Treatment Cost</Text>
                                            <Text style={[styles.treatmentTextCostValue]}>
                                                {"\u20B9 "}{
                                                    typeof aIDetails.totalFee !== "undefined" && aIDetails.totalFee !== null
                                                        ? aIDetails.totalFee
                                                        : 0
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                : null
                        }
                        <View style={styles.pdViewStyle}>
                            {this.renderPdList(aIDetails)}
                        </View>
                        <View style={[styles.pdViewStyle, styles.imageContainer]}>
                            {
                                this.props.isShowImages ?
                                <View style={styles.imageUploadWrapper}>
                                {/* <View style={styles.hr}/> */}
                                    <SingleImageUpload
                                        extraData={{
                                            objectClass: "Cattle",
                                            isPrimary: true,
                                            dependentObjectClass: "Insemination"
                                        }}
                                        title={"Cattle Images"}
                                        dataObject={aIDetails}
                                        onChange={this.props.onChangeImageUpload}
                                        activateBackButton={this.props.activateBackButton}
                                        deactivateBackButton={this.props.deactivateBackButton}
                                    />
                                </View>
                                : null
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

AIDetails.propTypes = propTypes;

AIDetails.defaultProps = defaultProps;

export default AIDetails;
