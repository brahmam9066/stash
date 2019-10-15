import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";
import SingleImageUpload from "../../../../components/SingleImageUpload";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handlePressVaccinationEdit: PropTypes.func,
    vaccinationDetails: PropTypes.object,
    permissionsToModify: PropTypes.bool,
    enableBilling: PropTypes.bool,
    isSelf: PropTypes.bool,
    onChangeImageUpload: PropTypes.func,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func,
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handlePressVaccinationEdit: () => {},
    vaccinationDetails: {},
    permissionsToModify: false,
    enableBilling: false,
    isSelf: false,
    onChangeImageUpload: () => {},
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class VaccinationDetails extends Component {

    render() {
        const {vaccinationDetails,language} = this.props;
        const date = vaccinationDetails.treatmentDate ? vaccinationDetails.treatmentDate : "";
        const treatmentDate = moment(date).format("DD-MM-YYYY");
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
                                    {vaccinationDetails.cattle ? vaccinationDetails.cattle.stellaCode : ""}
                                </Text>
                                <Text
                                    style={styles.textstyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                   {I18n.t('lactationAnimalListing', {locale:language})}
                                 </Text>
                                    {vaccinationDetails.cattle ? vaccinationDetails.cattle.lactationState : ""}
                                </Text>
                                <Text
                                    style={styles.textstyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                   {I18n.t('breedingStateColon', {locale:language})}
                                </Text>
                                    {vaccinationDetails.cattle ? vaccinationDetails.cattle.breedingState : ""}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.profileViewStyle}>
                                <SubTitle
                                    heading={I18n.t('summary', {locale:language})}
                                    eventText={I18n.t('edit', {locale:language})}
                                    onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressVaccinationEdit() : (e) => { e.preventDefault(); }; }}
                                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                                <SubText
                                    text={I18n.t('treatmentDate', {locale:language})}
                                    value={treatmentDate}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                            </View>
                            {
                                this.props.enableBilling && vaccinationDetails.performedBy === "Self" ?
                                    <View style={styles.clinicalFindingsViewContainer}>
                                        <View style={styles.clinicalFindingsViewSubContainer}>
                                            <View style={styles.treatmentCostContainerStyle}>
                                                <Text style={styles.treatmentTextCostTitle}>Treatment Cost</Text>
                                                <Text style={[styles.treatmentTextCostValue]}>
                                                    {"\u20B9 "}{
                                                        typeof vaccinationDetails.totalFee !== "undefined" && vaccinationDetails.totalFee !== null
                                                            ? vaccinationDetails.totalFee
                                                            : 0
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    : null
                            }
                            <View style={styles.breedViewStyle}>
                                <SubTitle                                    
                                    heading={I18n.t('details', {locale:language})}
                                    eventTextStyle={[styles.eventTextstyle]}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                                <SubText
                                    text={I18n.t('disease', {locale:language})}
                                    value={vaccinationDetails.disease ? vaccinationDetails.disease[0].toUpperCase() + vaccinationDetails.disease.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                                <SubText
                                    text={I18n.t('vaccination', {locale:language})}
                                    value={(vaccinationDetails.prescriptions && vaccinationDetails.prescriptions[0].medicineName) ? vaccinationDetails.prescriptions[0].medicineName[0].toUpperCase() + vaccinationDetails.prescriptions[0].medicineName.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                            text={I18n.t('inspectedBy', {locale:language})}
                                            value={vaccinationDetails.inspectedBy.firstName}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelStyle}
                                        />
                                    </View>
                                    <View style={styles.width40}>
                                        <SubText
                                            text={I18n.t('doneBy', {locale:language})}
                                            value={vaccinationDetails.performedBy ? vaccinationDetails.performedBy : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelStyle}
                                        />
                                    </View>
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                            text={I18n.t('route', {locale:language})}
                                            value={(vaccinationDetails.prescriptions && vaccinationDetails.prescriptions[0].routeOfAdministration) ? vaccinationDetails.prescriptions[0].routeOfAdministration : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelStyle}
                                        />
                                    </View>
                                    <View style={styles.width40}>  
                                        <SubText
                                            text={I18n.t('unit', {locale:language})}
                                            value={(vaccinationDetails.prescriptions) ? vaccinationDetails.prescriptions[0].unit : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelStyle}
                                        />
                                    </View>
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                            text="Withdrawal Period"
                                            value={(vaccinationDetails.prescriptions) ? vaccinationDetails.prescriptions[0].drugWithdrawalPeriods : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelStyle}
                                        />
                                    </View>
                                </View>
                            </View>
                            {
                            this.props.isShowImages ?
                            <View style={styles.imageUploadWrapper}>
                            {/* <View style={styles.hr}/> */}
                                <SingleImageUpload
                                    extraData={{
                                        objectClass: "Cattle",
                                        isPrimary: true,
                                        dependentObjectClass: "Vaccination"
                                    }}
                                title={"Cattle Images"}
                                dataObject={vaccinationDetails}
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

VaccinationDetails.propTypes = propTypes;

VaccinationDetails.defaultProps = defaultProps;

export default VaccinationDetails;
