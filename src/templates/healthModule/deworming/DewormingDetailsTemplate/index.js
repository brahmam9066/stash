import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import AnimalProfile from "../../../../components/AnimalProfile";
import Footer from "../../../../components/Footer";
import SubText from "../../../../components/SubText";
import SubTitle from "../../../../components/SubTitle";
import  I18n from "../../../../utils/language.utils";
import SingleImageUpload from "../../../../components/SingleImageUpload";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    dewormingDetails: PropTypes.object,
    onPressEvent: PropTypes.func,
    enableBilling: PropTypes.bool,
    isSelf: PropTypes.bool,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    dewormingDetails: {},
    onPressEvent: () => {},
    enableBilling: false,
    isSelf: true,
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class DewormingDetails extends Component {
    render() {
        const {dewormingDetails,language} = this.props;
        let inspectedBy = "";
        if (dewormingDetails.inspectedBy) {
            if (dewormingDetails.inspectedBy.firstName && dewormingDetails.inspectedBy.lastName) {
                inspectedBy = `${dewormingDetails.inspectedBy.firstName} ${dewormingDetails.inspectedBy.lastName}`;
            } else if (dewormingDetails.inspectedBy.firstName) {
                inspectedBy = dewormingDetails.inspectedBy.firstName;
            }
        }

        const prescription = dewormingDetails.prescriptions && dewormingDetails.prescriptions.length > 0 ? dewormingDetails.prescriptions[0] : {};
        const date = dewormingDetails.treatmentDate ? dewormingDetails.treatmentDate : "";
        const treatmentDate = moment(date).format("DD-MM-YYYY");
        const review = dewormingDetails.nextReview ? dewormingDetails.nextReview : "";
        const nextReview = moment(review).format("DD-MM-YYYY");
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <Toolbar
                            leftIconName="arrow-left"
                            onPressLeftIcon={this.props.onbackPress}
                            title={this.props.toolbarTitle} />
                        <View style={styles.filterViewContainer}>
                            <AnimalProfile>
                                <View>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={styles.labelstyle}>
                                       {I18n.t('registrationIdAnimalListing', {locale:language})}
                                       {dewormingDetails.cattle && dewormingDetails.cattle.stellaCode ? dewormingDetails.cattle.stellaCode : ""}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={styles.profileTextStyle}>
                                        <Text style={styles.labelstyle}>
                                        {I18n.t('lactationAnimalListing', {locale:language})}
                                        </Text>
                                        {dewormingDetails.cattle && dewormingDetails.cattle.lactationState ? dewormingDetails.cattle.lactationState : ""}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={styles.profileTextStyle}>
                                        <Text style={styles.labelstyle}>
                                        {I18n.t('breedingStateColon', {locale:language})}
                                        </Text>
                                        {dewormingDetails.cattle && dewormingDetails.cattle.breedingState ? dewormingDetails.cattle.breedingState : ""}
                                    </Text>
                                </View>
                            </AnimalProfile>
                        </View>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.breedViewStyle}>
                                <SubTitle
                                    heading={I18n.t('summary', {locale:language})}
                                    eventText={I18n.t('edit', {locale:language})}
                                    onPressEvent={this.props.handlePressDewormingEdit}
                                    subTitleStyle={styles.subTitleStyle}
                                    titleStyle={styles.titlestyle}
                                    eventTextStyle={styles.eventTextStyle}
                                />
                                <SubText
                                    text={I18n.t('treatmentDate', {locale:language})}
                                    value={treatmentDate}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text={I18n.t('nextReviewDate', {locale:language})}
                                    value={nextReview}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.breedViewStyle}>
                                <SubTitle
                                    heading={I18n.t('details', {locale:language})}
                                    subTitleStyle={styles.subTitleStyle}
                                    titleStyle={styles.titlestyle}
                                />
                                <SubText
                                    text={I18n.t('inspectedBy', {locale:language})}
                                    value={inspectedBy}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text={I18n.t('doneBy', {locale:language})}
                                    value={dewormingDetails.performedBy ? dewormingDetails.performedBy : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                        </View>
                        {
                            this.props.enableBilling && this.props.performedBy === "Self" ?
                                <View style={styles.clinicalFindingsViewContainer}>
                                    <View style={styles.clinicalFindingsViewSubContainer}>
                                        <View style={styles.treatmentCostContainerStyle}>
                                            <Text style={styles.treatmentTextCostTitle}>Treatment Cost</Text>
                                            <Text style={[styles.treatmentTextCostValue]}>
                                                {"\u20B9 "}{
                                                    typeof dewormingDetails.totalFee !== "undefined" && dewormingDetails.totalFee !== null
                                                        ? dewormingDetails.totalFee
                                                        : 0
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                : null
                        }
                        <View style={styles.informationViewStyle}>
                            <View style={[styles.breedViewStyle, styles.borderWidth0]}>
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                            text={I18n.t('dewormer', {locale:language})}
                                            value={
                                                prescription.medicine && prescription.medicine.medicineName ? prescription.medicine.medicineName[0].toUpperCase() + prescription.medicine.medicineName.slice(1).toLowerCase()
                                                    : prescription.medicineName ? prescription.medicineName[0].toUpperCase() + prescription.medicineName.slice(1).toLowerCase() : ""
                                            }
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.width40}>
                                        <SubText
                                            text={I18n.t('worm', {locale:language})}
                                            value={dewormingDetails.worm ? dewormingDetails.worm : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                            text={I18n.t('route', {locale:language})}
                                            value={prescription.routeOfAdministration ? prescription.routeOfAdministration : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.width40}>
                                        <SubText
                                                text={I18n.t('dosage', {locale:language})}
                                                value={prescription.dose ? prescription.dose : ""}
                                                textStyle={styles.textstyle}
                                                labelStyle={styles.labelstyle}
                                            />
                                    </View>
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                            text={I18n.t('unitPrice', {locale:language})}
                                            value={prescription.unitPrice ? prescription.unitPrice : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                    <View style={styles.width40}>  
                                        <SubText
                                            text={I18n.t('unit', {locale:language})}
                                            value={prescription.unit ? prescription.unit : ""}
                                            textStyle={styles.textstyle}
                                            labelStyle={styles.labelstyle}
                                        />
                                    </View>
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <View style={styles.width60}>
                                        <SubText
                                                text="Withdrawal Period"
                                                value={prescription.drugWithdrawalPeriods ? prescription.drugWithdrawalPeriods : ""}
                                                textStyle={styles.textstyle}
                                                labelStyle={styles.labelstyle}
                                            />
                                    </View>
                                </View>
                            </View>
                            {
                            this.props.enableBilling && dewormingDetails.performedBy === "Self" ?
                                <View style={styles.clinicalFindingsViewContainer}>
                                    <View style={styles.clinicalFindingsViewSubContainer}>
                                        <View style={styles.treatmentCostContainerStyle}>
                                            <Text style={styles.treatmentTextCostTitle}>Treatment Cost</Text>
                                            <Text style={[styles.treatmentTextCostValue]}>
                                                {"\u20B9 "}{
                                                    typeof dewormingDetails.totalFee !== "undefined" && dewormingDetails.totalFee !== null
                                                        ? dewormingDetails.totalFee
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
                                <SingleImageUpload
                                    extraData={{
                                        objectClass: "Cattle",
                                        isPrimary: true,
                                        dependentObjectClass: "Deworming"
                                    }}
                                title={"Cattle Images"}
                                dataObject={dewormingDetails}
                                activateBackButton={this.props.activateBackButton}
                                deactivateBackButton={this.props.deactivateBackButton}
                            />
                            </View>
                            : null
                        }
                    </View>
                </ScrollView>
                <View style={styles.footerViewStyle}>
                    <Footer 
                     language={language}/>
                </View>
            </View>
        );
    }
}

DewormingDetails.propTypes = propTypes;

DewormingDetails.defaultProps = defaultProps;


export default DewormingDetails;
