import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import Table from "../../../../components/Table";
import Tabs from "../../../../components/Tabs";
import AnimalProfile from "../../../../components/AnimalProfile";
import  I18n from "../../../../utils/language.utils";
import SingleImageUpload from "../../../../components/SingleImageUpload";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    treatmentDetails: PropTypes.object,
    handlePressTreatmentEdit: PropTypes.func,
    handlePressPrescriptionEdit: PropTypes.func,
    permissionsToModify: PropTypes.bool,
    enableBilling: PropTypes.bool,
    isSelf: PropTypes.bool,
    tabList: PropTypes.array,
    defaultTab: PropTypes.string,
    handleTabPress: PropTypes.func,
    tabIconStyle: PropTypes.object,
    tabStyle: PropTypes.object,
    isShowImages: PropTypes.bool,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func,
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    treatmentDetails: {},
    handlePressTreatmentEdit: () => { },
    handlePressPrescriptionEdit: () => { },
    permissionsToModify: false,
    enableBilling: false,
    isSelf: false,
    tabList: [],
    defaultTab: "",
    handleTabPress: () => { },
    tabIconStyle: {},
    tabStyle: {},
    isShowImages: false,
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class ObservationDetails extends Component {

    renderPrescriptionList = () => {
        const { treatmentDetails } = this.props;
        if (treatmentDetails && treatmentDetails.prescriptions && treatmentDetails.prescriptions.length > 0) {
            return treatmentDetails.prescriptions.map((value, index) => {
                let medName = "";
                let routeOfAdmin = "";
                if (value.medicine) {
                    medName = value.medicineName;
                    routeOfAdmin = value.routeOfAdministration;
                } else if (value.medicineName) {
                    medName = value.medicineName;
                    routeOfAdmin = value.routeOfAdministration;
                }
                console.log("val", value);
                return (
                    <Table
                        key={index}
                        sl={index+1}
                        medicine={medName} 
                        frequency={value ? value.frequency : ""}
                        duration={value ? value.duration : ""}
                        route={routeOfAdmin}
                        tabStyle={styles.tabstyle}
                    />);
            });
        }
        return (
            <View style={{ height: 50, width: "100%", alignItems: "center", justifyContent: "center"}}>
                <Text>No Records Found</Text>
            </View>
        );
    }

    render() {
        const {treatmentDetails, language} = this.props;
        console.log("health", treatmentDetails.prescriptions);
        const recordDate = treatmentDetails.treatmentDate ? treatmentDetails.treatmentDate : "";
        const treatmentDate = moment(recordDate).format("DD-MM-YYYY");
        const review = treatmentDetails.nextReview ? treatmentDetails.nextReview : "";
        const nextReview = moment(review).format("DD-MM-YYYY");
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView>
                    <View style={styles.backgroundWhite}>
                        <AnimalProfile>
                            <View style={styles.animalProfileView}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.titlestyle}>
                                    {I18n.t('registrationIdAnimalListing', {locale:language})}
                                    {treatmentDetails.cattle.stellaCode ? treatmentDetails.cattle.stellaCode : ""}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.textstyle}>
                                    <Text style={styles.titlestyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text> 
                                    {treatmentDetails.cattle.lactationState ? treatmentDetails.cattle.lactationState : ""}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.textstyle}>
                                    <Text style={styles.titlestyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text>{treatmentDetails.cattle.breedingState ? treatmentDetails.cattle.breedingState : ""}
                                </Text>
                            </View>
                        </AnimalProfile>
                    </View>
                    <View style={styles.informationViewStyle}>
                        <View style={styles.profileViewStyle}>
                            <SubTitle
                                heading= {I18n.t('summary', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressTreatmentEdit() : e.preventDefault(); }}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('recordedDate', {locale:language})}
                                value={treatmentDate}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <SubText
                                text= {I18n.t('nextReview', {locale:language})}
                                value={nextReview}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                        <View style={styles.breedViewStyle}>
                            <SubTitle
                                heading= {I18n.t('physicalInspection', {locale:language})}
                                eventTextStyle={[styles.eventTextStyle]}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('heartRate', {locale:language})}
                                    value={treatmentDetails.heartRate ? treatmentDetails.heartRate : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('weight', {locale:language})}
                                    value={treatmentDetails.weight ? treatmentDetails.weight : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('pulses', {locale:language})}
                                    value={treatmentDetails.pulse ? treatmentDetails.pulse : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('temperature', {locale:language})}
                                    value={treatmentDetails.temperature ? treatmentDetails.temperature : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('ruminationRate', {locale:language})}
                                    value={treatmentDetails.ruminaryRate ? treatmentDetails.ruminaryRate : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('respiration', {locale:language})}
                                    value={treatmentDetails.respiration ? treatmentDetails.respiration : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <SubText
                                text= {I18n.t('treatments', {locale:language})}
                                value=""
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <SubText
                                text= {I18n.t('labTestRecords', {locale:language})}
                                value=""
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                        <View style={styles.clinicalFindingsView}>
                            <SubTitle
                                heading= {I18n.t('clinicalFindings', {locale:language})}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('problemsFound', {locale:language})}
                                value={treatmentDetails.clinicalFindings ? treatmentDetails.clinicalFindings : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('symptoms', {locale:language})}
                                    value={treatmentDetails.symptom ? treatmentDetails.symptom.charAt(0).toUpperCase() + treatmentDetails.symptom.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('diagnosis', {locale:language})}
                                    value={treatmentDetails.diagnosis ? treatmentDetails.diagnosis.charAt(0).toUpperCase() + treatmentDetails.diagnosis.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <SubText
                                text= {I18n.t('doneBy', {locale:language})}
                                value={treatmentDetails.inspectedBy.firstName}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                        {
                            this.props.enableBilling && this.props.isSelf ?
                                <View style={styles.clinicalFindingsViewContainer}>
                                    <View style={styles.treatmentCostContainerStyle}>
                                        <Text style={styles.treatmentTextCostTitle}>Treatment Cost</Text>
                                        <Text style={[styles.treatmentTextCostValue]}>
                                            {"\u20B9 "}{
                                                typeof treatmentDetails.totalFee !== "undefined" && treatmentDetails.totalFee !== null
                                                    ? treatmentDetails.totalFee
                                                    : 0
                                            }
                                        </Text>
                                    </View>
                                </View>
                                : null
                        }
                        <View style={styles.clinicalFindingsView}>
                            <SubTitle
                                heading= {I18n.t('prescription', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressPrescriptionEdit() : e.preventDefault(); }}
                                eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('followUpDate', {locale:language})}
                                value=""
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                    </View>
                    <View style={styles.tableStyle}>
                        <Table
                            sl= {I18n.t('si', {locale:language})}
                            medicine= {I18n.t('medicineName', {locale:language})}
                            frequency= {I18n.t('frequency', {locale:language})}
                            duration= {I18n.t('duration', {locale:language})}
                            route= {I18n.t('route', {locale:language})}
                            tabStyle={styles.tabstyle}
                            labelStyle={styles.labelstyle}
                            flexRowStyle={styles.flexRowStyle}
                        />
                        {this.renderPrescriptionList()}
                    </View>
                    <View style={styles.imageContainer}>
                        {
                            this.props.isShowImages ?
                            <View style={styles.imageUploadWrapper}>
                            {/* <View style={styles.hr}/> */}
                                <SingleImageUpload
                                    extraData={{
                                        objectClass: "Cattle",
                                        isPrimary: true,
                                        dependentObjectClass: "Treatment"
                                    }}
                                    title={"Cattle Images"}
                                    dataObject={treatmentDetails}
                                    onChange={this.props.onChangeImageUpload}
                                    activateBackButton={this.props.activateBackButton}
                                    deactivateBackButton={this.props.deactivateBackButton}
                                />
                            </View>
                            : null
                        }
                    </View>
                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Tabs
                            tabList={this.props.tabList}
                            defaultTab={this.props.defaultTab}
                            handleTabPress={this.props.handleTabPress}
                            tabIconStyle={styles.tabIconStyle}
                            tabStyle={styles.tabStyle} />
                    </ScrollView> */}
                </ScrollView>
            </View>
        );
    }
}

ObservationDetails.propTypes = propTypes;

ObservationDetails.defaultProps = defaultProps;

export default ObservationDetails;
