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
    permissionsToModify: PropTypes.bool,
    isShowImages: PropTypes.bool,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    permissionsToModify: false,
    isShowImages: false,
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class BCSDetails extends Component {
    render() {
        const {bcsDetails,language}= this.props;
        let medicine = "";
        let dosage = "";
        // if ((dehorningDetails.prescriptions && dehorningDetails.prescriptions.length > 0 && dehorningDetails.prescriptions[0].medicine)) {
        //     medicine = dehorningDetails.prescriptions[0].medicine.medicineName;
        //     dosage = dehorningDetails.prescriptions[0].dose;
        // }
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
                                    {bcsDetails.cattle.stellaCode}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text> {bcsDetails.cattle.lactationState}
                                 </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text> {bcsDetails.cattle.breedingState}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.detailsViewStyle}>
                                <SubTitle
                                    heading={I18n.t('bcsDetails', {locale:language})}
                                    eventText={I18n.t('edit', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                    onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressEditBCS() : e.preventDefault() }}
                                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                />
                                <SubText
                                    text={I18n.t('bodyConditionScore1to10', {locale:language})}
                                    value={bcsDetails.score}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                                <SubText
                                    text={I18n.t('dateTime', {locale:language})}
                                    value={moment(bcsDetails.measurementDate).format("DD-MM-YYYY")}
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
                                        dependentObjectClass: "BodyConditionScore"
                                    }}
                                    title={"Cattle Images"}
                                    dataObject={bcsDetails}
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

BCSDetails.propTypes = propTypes;

BCSDetails.defaultProps = defaultProps;

export default BCSDetails;
