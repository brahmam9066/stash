import React, {Component} from "react";
import {FlatList, Image, ScrollView, Text, View} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Toolbar from "../../../components/Toolbar";
import SubTitle from "../../../components/SubTitle";
import SubText from "../../../components/SubText";
import I18n from "../../../utils/language.utils";

import styles from "./styles";
import {noResultsIcons} from "../../../assets";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    handlePressNutritionEdit: PropTypes.func,
    nutritionDetails: PropTypes.object,
    permissionsToModify: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onbackPress: () => {},
    handlePressNutritionEdit: () => {},
    nutritionDetails: {},
    permissionsToModify: false
};

class NutritionDetails extends Component {

    _keyExtractor = (p) => {
        return this.createRandomId();
    }

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    _renderItem = ({item}) => {
        const {language} = this.props;
        return (
            <View style={{...styles.flatStyle, ...styles.cattleDetailsContainer}}>
                <View style={styles.itemPane}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.textstyle}>
                        {I18n.t("typeAIListing", {locale: language})} {item.feedType.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{...styles.textstyle, ...styles.textWidth}}>
                        {I18n.t("quantityColon", {locale: language})} {item.quantity}
                    </Text>
                </View>
                <View style={styles.itemPane}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.textstyle}>
                        {I18n.t("description", {locale: language})} {item.feedType.description}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{...styles.textstyle, ...styles.textWidth}}>
                        {I18n.t("costColon", {locale: language})} {item.cost}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const {nutritionDetails, language} = this.props;
        const date = nutritionDetails.nutritionDate ? nutritionDetails.nutritionDate : "";
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
                            <View style={styles.cattleDetailsContainer}>
                                <Text
                                    style={styles.textstyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    <Text style={styles.labelStyle}>
                                        {I18n.t("registrationIdAnimalListing", {locale: language})}
                                    </Text>
                                    {nutritionDetails.cattle ? nutritionDetails.cattle.stellaCode : ""}
                                </Text>
                                <Text
                                    style={styles.textstyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    <Text style={styles.labelStyle}>
                                        {I18n.t("lactationAnimalListing", {locale: language})}
                                    </Text>
                                    {nutritionDetails.cattle ? nutritionDetails.cattle.lactationState : ""}
                                </Text>
                                <Text
                                    style={styles.textstyle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    <Text style={styles.labelStyle}>
                                        {I18n.t("breedingStateColon", {locale: language})}
                                    </Text>
                                    {nutritionDetails.cattle ? nutritionDetails.cattle.breedingState : ""}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.informationViewStyle}>
                            <View style={styles.profileViewStyle}>
                                <SubTitle
                                    heading={I18n.t("summary", {locale: language})}
                                    eventText=""
                                    onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressNutritionEdit() : (e) => { e.preventDefault(); }; }}
                                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                                <SubText
                                    text={I18n.t("date", {locale: language})}
                                    value={treatmentDate}
                                    textStyle={styles.textstyle}
                                    labelStyle={styles.labelStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.subtitleHolder}>
                                <SubTitle
                                    heading={I18n.t("items", {locale: language})}
                                    eventText=""
                                    onPressEvent={(e) => { this.props.permissionsToModify ? this.props.handlePressNutritionEdit() : (e) => { e.preventDefault(); }; }}
                                    eventTextStyle={[styles.eventTextStyle, this.props.permissionsToModify ? styles.enableTextColor : styles.disableTextColor]}
                                    titleStyle={styles.titlestyle}
                                    subTitleStyle={styles.subTitleStyle}
                                />
                            </View>
                            <FlatList
                                data={this.props.nutritionDetails.items}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                ListEmptyComponent={() => (!this.props.nutritionDetails.items && this.props.isInternetConnected ?
                                    <Image source={noResultsIcons.iconNoResults} style={styles.emptyMessageStyle} resizeMode="center" />
                                    : null)}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

NutritionDetails.propTypes = propTypes;

NutritionDetails.defaultProps = defaultProps;

export default NutritionDetails;
