import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import {registerAnimalIcons} from "../../../../assets";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import PageDetailsHeader from "../../../../components/PageDetailsHeader";
import SearchBar from "../../../../components/SearchBar";
import {navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import SingleImageUpload from "../../../../components/SingleImageUpload";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    morphologicalDetails: PropTypes.any,
    isShowImages: PropTypes.bool,
    activateBackButton: PropTypes.func,
    deactivateBackButton: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    morphologicalDetails: [],
    isShowImages: false,
    activateBackButton: () => {},
    deactivateBackButton: () => {}
};

class MorphologicalDetails extends Component {

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

    render() {
        const {morphologicalDetails,language} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView>
                    <View style={styles.informationViewStyle}>
                        <View style={styles.cattleDetailsConteiner}>
                            <Text
                                style={styles.labelStyle}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {I18n.t('registrationIdAnimalListing', {locale:language})}
                                {morphologicalDetails.cattle ? morphologicalDetails.cattle.stellaCode : ""}
                            </Text>
                            <Text
                                style={styles.textstyle}
                                numberOfLines={1}
                                ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                {I18n.t('lactationAnimalListing', {locale:language})}
                                </Text> {morphologicalDetails.cattle ?morphologicalDetails.cattle.lactationState :""}
                            </Text>
                            <Text
                                style={styles.textstyle}
                                numberOfLines={1}
                                ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                {I18n.t('breedingStateColon', {locale:language})}
                                </Text> {morphologicalDetails.cattle ? morphologicalDetails.cattle.breedingState : ""}
                            </Text>
                        </View>
                        <View style={styles.profileViewStyle}>
                            <SubTitle
                                heading= {I18n.t('summary', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressMorphologyEdit() : e.preventDefault(); }}
                                eventTextStyle={styles.eventTextStyle}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('measureddate', {locale:language})}
                                value={morphologicalDetails ? morphologicalDetails.measurementDate : ""}
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelstyle}
                            />
                        </View>
                    </View>
                    <View style={styles.informationViewStyle}>
                        <View style={styles.profileViewStyle}>
                            <SubTitle
                                heading= {I18n.t('cattleMorphologyRecords', {locale:language})}
                                eventTextStyle={styles.eventTextStyle}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            {
                                morphologicalDetails && morphologicalDetails.cattleMorphologyRecords && morphologicalDetails.cattleMorphologyRecords.length > 0
                                    ? morphologicalDetails.cattleMorphologyRecords.map((item, index) => {
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
                            }
                        </View>
                    </View>
                    {/*
                            this.props.isShowImages ?
                            <View style={styles.imageUploadWrapper}>
                                <SingleImageUpload
                                    extraData={{
                                        objectClass: "Cattle",
                                        isPrimary: true,
                                        dependentObjectClass: "CattleMorphology"
                                    }}
                                    title={"Cattle Images"}
                                    dataObject={morphologicalDetails}
                                    onChange={this.props.onChangeImageUpload}
                                    activateBackButton={this.props.activateBackButton}
                                    deactivateBackButton={this.props.deactivateBackButton}
                                />
                            </View>
                            : null
                                */}
                </ScrollView>
            </View>
        );
    }
}

MorphologicalDetails.propTypes = propTypes;

MorphologicalDetails.defaultProps = defaultProps;

export default MorphologicalDetails;
