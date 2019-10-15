import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../../components/Toolbar";
import SubTitle from "../../../../components/SubTitle";
import SubText from "../../../../components/SubText";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    toolbarTitle: PropTypes.string,
    milkLogDetailsForDay: PropTypes.array,
    onbackPress: PropTypes.func,
    handlePressEditMilkLog: PropTypes.func
};

const defaultProps = {
    toolbarTitle: "",
    milkLogDetailsForDay: [],
    onbackPress: () => { },
    handlePressEditMilkLog: () => {}
};

class MilkLogDetails extends Component {
    render() {
        const {milkLogDetailsForDay, language} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={styles.bodyContent}>
                    <ScrollView>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.cattleDetailsConteiner}>
                                <Text
                                    style={styles.labelStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {I18n.t('registrationIdAnimalListing', {locale:language})}
                                    {
                                        milkLogDetailsForDay[0] && milkLogDetailsForDay[0].cattles && milkLogDetailsForDay[0].cattles[0]
                                            ? milkLogDetailsForDay[0].cattles[0].stellaCode
                                            : null
                                    }
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('lactationAnimalListing', {locale:language})}
                                    </Text> {
                                        milkLogDetailsForDay[0] && milkLogDetailsForDay[0].cattles && milkLogDetailsForDay[0].cattles[0]
                                            ? milkLogDetailsForDay[0].cattles[0].lactationState
                                            : null
                                    }
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                    {I18n.t('breedingStateColon', {locale:language})}
                                    </Text> {
                                        milkLogDetailsForDay[0] && milkLogDetailsForDay[0].cattles && milkLogDetailsForDay[0].cattles[0]
                                            ? milkLogDetailsForDay[0].cattles[0].breedingState
                                            : null
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.detailsViewStyle}>
                            <SubTitle
                                heading= {I18n.t('summary', {locale:language})}
                                titleStyle={styles.titlestyle}
                                subTitleStyle={styles.subTitleStyle}
                            />
                            <SubText
                                text= {I18n.t('dateTimebar', {locale:language})}
                                value={
                                    milkLogDetailsForDay[0] && milkLogDetailsForDay[0] && milkLogDetailsForDay[0].collectedOn ?
                                        moment(milkLogDetailsForDay[0].collectedOn).format("DD MMM YYYY")
                                        : ""
                                }
                                textStyle={styles.textstyle}
                                labelStyle={styles.labelStyle}
                            />
                        </View>
                        {milkLogDetailsForDay.map(milkLog => (
                            <View style={styles.detailsViewStyle} key={milkLog.id}>
                                <SubTitle
                                    heading={
                                        milkLog.collectionSession
                                            ? milkLog.collectionSession.slice(0, 1).toUpperCase() +
                                                milkLog.collectionSession.slice(1, milkLog.collectionSession.length).toLowerCase()
                                            : ""
                                    }
                                    eventText= {I18n.t('edit', {locale:language})}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                    eventTextStyle={styles.eventTextStyle}
                                    onPressEvent={() => { this.props.handlePressEditMilkLog(milkLog); }}
                                />
                                <View style={styles.row}>
                                    <View style={styles.col25}>
                                        <Text style={styles.tableHeading}>
                                        {I18n.t('quantity', {locale:language})}
                                        </Text>
                                        <Text style={styles.tableData}>
                                            {
                                                milkLog.quantity
                                                    ? `${milkLog.quantity} L`
                                                    : ""
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.col25}>
                                        <Text style={styles.tableHeading}>
                                        {I18n.t('fatper', {locale:language})}
                                        </Text>
                                        <Text style={styles.tableData}>
                                            {
                                                milkLog.qualityMeasurements && milkLog.qualityMeasurements[0] && milkLog.qualityMeasurements[0].fat
                                                    ? `${milkLog.qualityMeasurements[0].fat} %`
                                                    : null
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.col25}>
                                        <Text style={styles.tableHeading}>
                                        {I18n.t('snfper', {locale:language})}
                                        </Text>
                                        <Text style={styles.tableData}>
                                            {
                                                milkLog.qualityMeasurements && milkLog.qualityMeasurements[0] && milkLog.qualityMeasurements[0].snf
                                                    ? `${milkLog.qualityMeasurements[0].snf} %`
                                                    : null
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.col25}>
                                        <Text style={styles.tableHeading}>
                                        {I18n.t('sccperml', {locale:language})}
                                        </Text>
                                        <Text style={styles.tableData}>
                                            {
                                                milkLog.qualityMeasurements && milkLog.qualityMeasurements[0] && milkLog.qualityMeasurements[0].scc
                                                    ? `${milkLog.qualityMeasurements[0].scc} / ML`
                                                    : null
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

MilkLogDetails.propTypes = propTypes;

MilkLogDetails.defaultProps = defaultProps;

export default MilkLogDetails;
