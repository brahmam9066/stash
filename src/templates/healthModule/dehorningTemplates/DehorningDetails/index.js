import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import  I18n from "../../../../utils/language.utils";
import SingleImageUpload from "../../../../components/SingleImageUpload";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handlePressDehorningEdit: PropTypes.func,
    dehorningDetails: PropTypes.object,
    permissionsToModify: PropTypes.bool,
    enableBilling: PropTypes.bool,
    isSelf: PropTypes.bool,
    isShowImages: PropTypes.bool,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handlePressDehorningEdit: () => {},
    dehorningDetails: {},
    permissionsToModify: false,
    enableBilling: false,
    isSelf: false,
    isShowImages: false,
    activateBackButton: () => {},
    deactivateBackButton: () => {}

};

class DehorningDetails extends Component {
    render() {
        const {dehorningDetails,language} = this.props;
        // let medicine = "";
        // let dosage = "";
        const date = dehorningDetails.treatmentDate;
        const treatmentDate = moment(date).format("DD-MM-YYYY");
        if ((dehorningDetails.prescriptions && dehorningDetails.prescriptions.length > 0 && dehorningDetails.prescriptions[0].medicine)) {
            // medicine = dehorningDetails.prescriptions[0].medicineName;
            // dosage = dehorningDetails.prescriptions[0].dose;
        }
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView contentContainerStyle={styles.bodyContent}>
                    <View style={styles.cattleDetailsConteiner}>
                        <Text
                            style={styles.labelStyle}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {I18n.t('registrationIdAnimalListing', {locale:language})}
                            {dehorningDetails.cattle.stellaCode}
                        </Text>
                        <Text
                            style={styles.textstyle}
                            numberOfLines={1}
                            ellipsizeMode="tail"><Text style={styles.labelStyle}>
                            {I18n.t('lactationAnimalListing', {locale:language})}
                            </Text> {dehorningDetails.cattle.lactationState}
                        </Text>
                        <Text
                            style={styles.textstyle}
                            numberOfLines={1}
                            ellipsizeMode="tail"><Text style={styles.labelStyle}>
                            {I18n.t('breedingStateColon', {locale:language})}
                            </Text> {dehorningDetails.cattle.breedingState}
                        </Text>
                    </View>
                    <View style={styles.cattleDetailsConteiner}>
                        <SubTitle
                            heading={I18n.t('summary', {locale:language})}
                            eventText={I18n.t('edit', {locale:language})}
                            onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressDehorningEdit() : e.preventDefault(); }}
                            eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                            titleStyle={styles.titlestyle}
                            subTitleStyle={styles.subTitleStyle}
                        />
                        <SubText
                            text={I18n.t('dehorningDate', {locale:language})}
                            value={treatmentDate}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelStyle}
                        />
                    </View>
                    <View style={styles.informationViewStyle}>
                        <View style={styles.profileViewStyle}>
                            <SubTitle
                                heading={I18n.t('details', {locale:language})}
                                subTitleStyle={styles.subTitleStyle}
                                titleStyle={styles.titlestyle}
                            />
                            <View style={styles.flexRowStyle}>
                                <View style={styles.width60}>
                                    <SubText
                                        text={I18n.t('medicineName', {locale:language})}
                                        value={dehorningDetails.prescriptions[0].medicineName}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text={I18n.t('unit', {locale:language})}
                                        value={dehorningDetails.prescriptions[0].unit}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                                <View style={styles.width40}>
                                    <SubText
                                        text={I18n.t('dose', {locale:language})}
                                        value={dehorningDetails.prescriptions[0].dose}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text={I18n.t('unitPrice', {locale:language})}
                                        value={dehorningDetails.prescriptions[0].unitPrice}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                            </View>
                            <View style={styles.flexRowStyle}>
                                <View style={styles.width60}>
                                    <SubText
                                        text="Withdrawal Period"
                                        value={dehorningDetails.prescriptions[0].drugWithdrawalPeriods}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                                <View style={styles.width40}>
                                    <SubText
                                        text={I18n.t('doneBy', {locale:language})}
                                        value={dehorningDetails.performedBy}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                            </View>
                        </View>
                        {
                            this.props.enableBilling && dehorningDetails.performedBy === "Self" ?
                                <View style={styles.clinicalFindingsViewContainer}>
                                    <View style={styles.clinicalFindingsViewSubContainer}>
                                        <View style={styles.treatmentCostContainerStyle}>
                                            <Text style={styles.treatmentTextCostTitle}>Treatment Cost</Text>
                                            <Text style={[styles.treatmentTextCostValue]}>
                                                {"\u20B9 "}{
                                                    typeof dehorningDetails.totalFee !== "undefined" && dehorningDetails.totalFee !== null
                                                        ? dehorningDetails.totalFee
                                                        : 0
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                : null
                        }
                    </View>
                    {
                            this.props.isShowImages ?
                            <View style={styles.imageUploadWrapper}>
                            {/* <View style={styles.hr}/> */}
                                <SingleImageUpload
                                    extraData={{
                                        objectClass: "Cattle",
                                        isPrimary: true,
                                        dependentObjectClass: "Dehorning"
                                    }}
                                    title={"Cattle Images"}
                                    dataObject={dehorningDetails}
                                    onChange={this.props.onChangeImageUpload}
                                    activateBackButton={this.props.activateBackButton}
                                    deactivateBackButton={this.props.deactivateBackButton}
                                />
                            </View>
                            : null
                        }
                </ScrollView>
            </View>
        );
    }
}

DehorningDetails.propTypes = propTypes;

DehorningDetails.defaultProps = defaultProps;

export default DehorningDetails;
