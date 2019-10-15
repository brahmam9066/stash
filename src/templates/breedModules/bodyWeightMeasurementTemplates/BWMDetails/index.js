import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import SingleImageUpload from "../../../../components/SingleImageUpload";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    bwmDetails: PropTypes.object,
    onbackPress: PropTypes.func,
    permissionsToModify: PropTypes.bool,
    isShowImages: PropTypes.bool,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    bwmDetails: {},
    onbackPress: () => {},
    permissionsToModify: false,
    isShowImages: false,
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class BWMDetails extends Component {
    render() {
        const {bwmDetails,language} = this.props;
        // if ((dehorningDetails.prescriptions && dehorningDetails.prescriptions.length > 0 && dehorningDetails.prescriptions[0].medicine)) {
        //     medicine = dehorningDetails.prescriptions[0].medicine.medicineName;
        //     dosage = dehorningDetails.prescriptions[0].dose;
        // }
        console.log("bwmDetails", bwmDetails);
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
                                    {bwmDetails.cattle.stellaCode}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text> {bwmDetails.cattle.lactationState}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text> {bwmDetails.cattle.breedingState}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.detailsViewStyle}>
                                <SubTitle
                                    heading={I18n.t('bwmDetails', {locale:language})}
                                    eventText={I18n.t('edit', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                    onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressEditBwm() : e.preventDefault(); }}
                                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                />
                                <View style={styles.flexRowStyle}>
                                    <SubText
                                        text={I18n.t('chestWidthInch', {locale:language})}
                                        value={bwmDetails.chestGirth}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text={I18n.t('bodyLengthInch', {locale:language})}
                                        value={bwmDetails.bodyLength}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                                <View style={styles.flexRowStyle}>
                                    <SubText
                                        text={I18n.t('totalWeightkg', {locale:language})}
                                        value={bwmDetails.weight}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                    <SubText
                                        text={I18n.t('dateTime', {locale:language})}
                                        value={moment(bwmDetails.measurementDate).format("DD-MM-YYYY")}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelStyle}
                                    />
                                </View>
                                <SubText
                                    text={I18n.t('measurementType', {locale:language})}
                                    value={bwmDetails.measurementMethod}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
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
                                        dependentObjectClass: "BodyWeight"
                                    }}
                                    title={"Cattle Images"}
                                    dataObject={bwmDetails}
                                    onChange={this.props.onChangeImageUpload}
                                    activateBackButton={this.props.activateBackButton}
                                    deactivateBackButton={this.props.deactivateBackButton}
                                />
                            </View>
                            : null
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

BWMDetails.propTypes = propTypes;

BWMDetails.defaultProps = defaultProps;

export default BWMDetails;
