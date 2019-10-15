import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import AnimalProfile from "../../../../components/AnimalProfile";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import Tabs from "../../../../components/Tabs";
import {navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    calfDetails: PropTypes.object,
    morphologicalDetails: PropTypes.any,
    editEvent: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => { },
    calfDetails: {},
    morphologicalDetails: {},
    editEvent: () => {}
};

class CalfBirthDetails extends Component {

    render() {
        const {calfDetails, morphologicalDetails, editEvent, language} = this.props;
        console.log("calfDetails", calfDetails);
        const dob = calfDetails.dob ? calfDetails.dob : "";
        const years = moment().diff(dob, "years");
        const months = moment().diff(dob, "months");
        const age = dob !== "" ? `${years}y ${months % 12}m` : "";
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView>
                    <View style={styles.filterViewContainer}>
                        <AnimalProfile>
                            <View style={styles.damStyle}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.labelstyle}>
                                    {I18n.t('damIDCalfBirthListing', {locale:language})}
                                    {calfDetails.mother && calfDetails.mother.stellaCode ? calfDetails.mother.stellaCode : ""}
                                </Text>
                            </View>
                        </AnimalProfile>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Tabs
                                    tabList={this.props.tabList}
                                    defaultTab={this.props.defaultTab}
                                    handleTabPress={this.props.handleTabPress}
                                    tabIconStyle={styles.tabIconStyle}
                                    tabStyle={styles.tabStyle} />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.listViewContainer}>
                        <View style={styles.summaryViewStyle}>
                            <SubTitle
                                heading= {I18n.t('summary', {locale:language})}
                                eventText= {I18n.t('edit', {locale:language})}
                                subTitleStyle={styles.subTitleStyle}
                                titleStyle={styles.titlestyle}
                                eventTextStyle={styles.eventTextStyle}
                                onPressEvent={editEvent} />
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('species', {locale:language})}
                                    value={calfDetails.species ? calfDetails.species : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('breed', {locale:language})}
                                    value={calfDetails.breed ? calfDetails.breed : ""}
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
                                    value={calfDetails.dob ? moment(calfDetails.dob).format("YYYY-MM-DD") : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('sireType', {locale:language})}
                                    value={calfDetails.father ? calfDetails.father.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('damType', {locale:language})}
                                    value={calfDetails.mother ? calfDetails.mother.breed : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                            <View style={styles.flexRowStyle}>
                                <SubText
                                    text= {I18n.t('gender', {locale:language})}
                                    value={calfDetails.gender ? calfDetails.gender : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                                <SubText
                                    text= {I18n.t('status', {locale:language})}
                                    value={calfDetails.livestockState ? calfDetails.livestockState[0].toUpperCase() + calfDetails.livestockState.slice(1).toLowerCase() : ""}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelstyle}
                                />
                            </View>
                        </View>
                        <View style={styles.breedViewStyle}>
                            <SubTitle
                                heading = {I18n.t('breedInformation', {locale:language})}
                                subTitleStyle={styles.subTitleStyle}
                                titleStyle={styles.titlestyle} />
                            <View>
                                <View style={styles.flexRowStyle}>
                                    <SubText
                                        text= {I18n.t('lactation', {locale:language})}
                                        value={calfDetails.lactationState ? calfDetails.lactationState : ""}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelstyle}
                                    />
                                    <SubText
                                        text= {I18n.t('breedingStateColon', {locale:language})}
                                        value={calfDetails.breedingState ? calfDetails.breedingState : ""}
                                        textStyle={styles.textstyle}
                                        labelStyle={styles.labelstyle}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

CalfBirthDetails.propTypes = propTypes;

CalfBirthDetails.defaultProps = defaultProps;

export default CalfBirthDetails;
