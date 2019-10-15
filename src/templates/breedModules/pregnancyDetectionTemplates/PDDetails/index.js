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
    pdDetails: PropTypes.object,
    enableBilling: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    pdDetails: {},
    enableBilling: false
};

class PDDetails extends Component {

    render() {
        const {pdDetails,language} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={styles.bodyContent}>
                    <ScrollView>
                        <View style={{borderBottomWidth: 20, borderBottomColor: "#eeeeee"}}>
                        <View>
                            <View style={styles.cattleDetailsConteiner}>
                                <Text
                                    style={styles.labelStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {I18n.t('registrationIdAnimalListing', {locale:language})}
                                    {this.props.animalDetails.stellaCode}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text> {this.props.animalDetails.lactationState}
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text> {this.props.animalDetails.breedingState}
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
                                    text= {I18n.t('aiDoneDate', {locale:language})}
                                    value={moment(this.props.inseminationDetails.inseminationDate).format("DD-MM-YYYY")}
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
                                <SubText
                                    text= {I18n.t('pdCheckDate', {locale:language})}
                                    value={pdDetails.actualDate ? moment(pdDetails.actualDate).format("DD-MM-YYYY") : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                                <SubText
                                    text= {I18n.t('doneBy', {locale:language})}
                                    value={pdDetails.performedBy}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                                <SubText
                                    text= {I18n.t('pdResult', {locale:language})}
                                    value={pdDetails.result}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                            </View>
                        </View>
                        {
                            this.props.enableBilling ?
                                <View style={styles.clinicalFindingsViewContainer}>
                                    <View style={styles.clinicalFindingsViewSubContainer}>
                                        <View style={styles.treatmentCostContainerStyle}>
                                            <Text style={styles.treatmentTextCostTitle}>
                                            {I18n.t('treatmentCost', {locale:language})}
                                            </Text>
                                            <Text style={[styles.treatmentTextCostValue]}>
                                                {"\u20B9 "}{
                                                    typeof pdDetails.totalFee !== "undefined" && pdDetails.totalFee !== null
                                                        ? pdDetails.totalFee
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
                                        dependentObjectClass: "PdInspection"
                                    }}
                                    title={"Cattle Images"}
                                    dataObject={pdDetails}
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

PDDetails.propTypes = propTypes;

PDDetails.defaultProps = defaultProps;

export default PDDetails;
