import React, {Component} from "react";
import PropTypes from "prop-types";
import {ScrollView, View, Image, TouchableHighlight} from "react-native";
import {Button, Text} from "react-native-elements";
import Toolbar from "../../../components/Toolbar";
import SearchBar from "../../../components/SearchBar";
import I18n from "../../../utils/language.utils";
import styles from "./styles";
import {CalendarIcons} from "../../../assets";

const propTypes = {
    toolbarTitle: PropTypes.string,
    onBackPress: PropTypes.func,
    handleSearchItemPress: PropTypes.func,
    handleSearch: PropTypes.func,
    searchList: PropTypes.array,
    language: PropTypes.string,
    cattleDetails: PropTypes.object,
    onSaveButtonClicked: PropTypes.func,
    onDatePickerClicked: PropTypes.func,
    selectedDate: PropTypes.string,
    renderListView: PropTypes.element,
    isHidden: PropTypes.bool
};

const defaultProps = {
    toolbarTitle: "",
    onBackPress: () => {
    },
    handleSearchItemPress: () => {
    },
    handleSearch: () => {
    },
    searchList: [],
    language: "en",
    cattleDetails: {},
    onSaveButtonClicked: () => {
    },
    onDatePickerClicked: () => {},
    selectedDate: "",
    renderListView: <Text>Breed Form</Text>,
    isHidden: true
};

class RecordNutrition extends Component {

    render() {
        const {language} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onBackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView>
                    <SearchBar
                        handleSearch={this.props.handleSearch}
                        searchList={this.props.searchList}
                        handleSearchItemPress={this.props.handleSearchItemPress}
                        searchBarStyle={styles.searchbarBackground}
                        language={this.props.language} />
                    <View style={styles.padding}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.textBold}>
                            <Text style={styles.textBold}>
                                {this.props.isHidden ? "" : I18n.t("registrationIdAnimalListing", {locale: language})}
                            </Text>{this.props.isHidden ? "" : this.props.cattleDetails.stellaCode}
                        </Text>
                        <View style={styles.flatRowStyle}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.textBold}>
                                <Text style={styles.textNormal}>
                                    {this.props.isHidden ? "" : I18n.t("lactationAnimalListing", {locale: language})}
                                </Text>{this.props.isHidden ? "" : this.props.cattleDetails.lactationState}
                            </Text>
                        </View>
                        <View style={styles.flatRowStyle}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.textBold}>
                                <Text style={styles.textNormal}>
                                    {this.props.isHidden ? "" : I18n.t("breedingSaleContainers", {locale: language})}
                                </Text>{this.props.isHidden ? "" : this.props.cattleDetails.breedingState}
                            </Text>
                        </View>
                        {this.props.isHidden ? null : <View style={styles.separatorHorizontal}></View>}
                        <View style={styles.datePicker}>
                            <Text style={styles.headerLabel}>
                                {this.props.isHidden ? "" : I18n.t("details", {locale: language})}
                            </Text>
                            <View style={styles.flexRowStyle}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.textBold}>
                                    <Text style={styles.textNormal}>
                                        {this.props.isHidden ? "" : I18n.t("dateObservationListing", {locale: language})}
                                    </Text>{this.props.isHidden ? "" : this.props.selectedDate}
                                </Text>
                                {this.props.isHidden ? null :
                                    <TouchableHighlight onPress={this.props.onDatePickerClicked}>
                                        <Image source={CalendarIcons.iconCalendar} style={styles.calendar}/>
                                    </TouchableHighlight>
                                }
                            </View>
                        </View>
                    </View>
                    {this.props.renderListView}
                    {this.props.isHidden ? null : <Button
                        raised
                        title={I18n.t("save", {locale: language})}
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                        onPress={this.props.onSaveButtonClicked}
                        visible={this.props.isHidden} />
                    }
                </ScrollView>
            </View>
        );
    }
}

RecordNutrition.propTypes = propTypes;
RecordNutrition.defaultProps = defaultProps;
export default RecordNutrition;
