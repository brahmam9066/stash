import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import SearchBar from "../../../components/SearchBar";
import Toolbar from "../../../components/Toolbar";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    isEditMorphologyDetails: PropTypes.bool,
    cattleDetails: PropTypes.object,
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    renderDryOffForm: PropTypes.element,
    handleSavePress: PropTypes.func,
    searchList: PropTypes.array,
    handleSearch: PropTypes.func,
    handleSearchItemPress: PropTypes.func
};

const defaultProps = {
    cattleDetails: {},
    onbackPress: () => {},
    toolbarTitle: "",
    renderDryOffForm: <Text>Dry off Form</Text>,
    handleSavePress: () => {},
    searchList: [],
    handleSearch: () => {},
    handleSearchItemPress: () => {}
};

class RecordDryOff extends Component {

    render() {
        const {onbackPress, toolbarTitle, cattleDetails, handleSavePress, language} = this.props;
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={onbackPress}
                    title={toolbarTitle} />
                <View style={styles.flex1}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        <SearchBar
                            handleSearch={this.props.handleSearch}
                            searchList={this.props.searchList}
                            handleSearchItemPress={this.props.handleSearchItemPress} 
                            language={language}/>
                        {
                            cattleDetails.stellaCode ?
                                <View style={styles.cattleDetailsConteiner}>
                                    <Text
                                        style={styles.labelStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail">
                                        {I18n.t('registrationIdAnimalListing', {locale:language})}
                                        {cattleDetails.stellaCode}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('lactationAnimalListing', {locale:language})}
                                        </Text>{cattleDetails.lactationState}
                                    </Text>
                                    <Text
                                        style={styles.textStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"><Text style={styles.labelStyle}>
                                        {I18n.t('breedingStateColon', {locale:language})}
                                        </Text>{cattleDetails.breedingState}
                                    </Text>
                                </View>
                                : null
                        }
                        {
                            cattleDetails.stellaCode
                            ? <View>
                                {this.props.renderDryOffForm}
                                <Button
                                    id="dry-off-save"
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

RecordDryOff.defaultProps = defaultProps;

RecordDryOff.propTypes = propTypes;

export default RecordDryOff;
