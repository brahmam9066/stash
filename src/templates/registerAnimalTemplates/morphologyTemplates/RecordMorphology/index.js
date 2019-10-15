import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import SearchBar from "../../../../components/SearchBar";
import Toolbar from "../../../../components/Toolbar";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    isEditMorphologyDetails: PropTypes.bool,
    cattleDetails: PropTypes.object,
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    morphologicalForm: PropTypes.element,
    handleSavePress: PropTypes.func,
    searchList: PropTypes.array,
    handleSearch: PropTypes.func,
    handleSearchItemPress: PropTypes.func
};

const defaultProps = {
    isEditMorphologyDetails: false,
    cattleDetails: {},
    onbackPress: () => {},
    toolbarTitle: "",
    morphologicalForm: <Text>Pregnancy Form</Text>,
    handleSavePress: () => {},
    searchList: [],
    handleSearch: () => {},
    handleSearchItemPress: () => {}
};

class ProfileInformation extends Component {

    render() {
        const {onbackPress, toolbarTitle, isEditMorphologyDetails, cattleDetails, handleSearch, searchList, handleSearchItemPress, handleSavePress,language} = this.props;
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={onbackPress}
                    title={toolbarTitle} />
                <View style={styles.flex1}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        {!this.props.isEditMorphologyDetails &&
                            <SearchBar
                                handleSearch={this.props.handleSearch}
                                searchList={this.props.searchList}
                                handleSearchItemPress={this.props.handleSearchItemPress} 
                                language={language}/>
                        }
                        {
                            this.props.isEditMorphologyDetails || this.props.cattleDetails.id ?
                                <View style={styles.cattleDetailsConteiner}>
                                    <Text
                                        style={styles.labelStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail">
                                        {I18n.t('registrationIdAnimalListing', {locale:language})}
                                        {this.props.cattleDetails.stellaCode}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('lactationAnimalListing', {locale:language})}
                                        </Text>{this.props.cattleDetails.lactationState}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('breedingStateColon', {locale:language})}
                                        </Text>{this.props.cattleDetails.breedingState}
                                    </Text>
                                </View>
                                : null
                        }
                        {
                            this.props.isEditMorphologyDetails || this.props.cattleDetails.id ?
                                <View>
                                    {this.props.morphologicalForm}
                                    <Button
                                        id="morphology-save"
                                        accessibilityLabel="morphology-save-button"
                                        testID="morphology-save-button"
                                        raised
                                        title={I18n.t('save', {locale:language})}                 
                                        backgroundColor="#ed1c24"
                                        borderRadius={4}
                                        containerViewStyle={styles.buttonStyle}
                                        textStyle={styles.buttonTextStyle}
                                        onPress={handleSavePress} />
                                </View>
                                : <Text style={styles.noFormTextStyle}>
                               {I18n.t('searchwiththeRegisterationId', {locale:language})}
                                </Text>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

ProfileInformation.defaultProps = defaultProps;

ProfileInformation.propTypes = propTypes;

export default ProfileInformation;
