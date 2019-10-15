import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import Toolbar from "../../../components/Toolbar";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    profileForm: PropTypes.element,
    hmbForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    isPaidUser: PropTypes.bool,
    isEditProfileInfo: PropTypes.bool
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    profileForm: <Text>Profile Form</Text>,
    hmbForm: <Text>HMB Form</Text>,
    handleNextPress: () => {},
    isPaidUser: false,
    isEditProfileInfo: false
};

class ProfileInformation extends Component<{}> {

    render() {
        const {isPaidUser, isEditProfileInfo, language} = this.props;
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    leftIconId="profile-information-back-icon"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                {this.props.isInternetConnected ? 
                    <ScrollView contentContainerStyle={styles.scrollViewStyle} keyboardShouldPersistTaps={'handled'}>
                        {(isPaidUser && !isEditProfileInfo) && this.props.hmbForm}
                        <Text style={[styles.h6, styles.paddingHorizontal16]}>
                         {I18n.t('profileinformation', {locale:language})}                     
                        </Text>
                        {this.props.profileForm}
                        <Button
                            accessibilityLabel="profile-information-save-button"
                            testID="profile-information-save-button"
                            raised
                            title={this.props.keyFrom ? 
                                   I18n.t('save', {locale:language})                    
                                   : 
                                   I18n.t('next', {locale:language}) 
                            }
                            backgroundColor="#ed1c24"
                            borderRadius={4}
                            containerViewStyle={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                            onPress={this.props.handleNextPress} />
                    </ScrollView>
                    :
                    <ScrollView contentContainerStyle={styles.scrollViewStyle} keyboardShouldPersistTaps={'handled'}>
                        {(isPaidUser && !isEditProfileInfo) && this.props.hmbForm}
                        <Text style={[styles.h6, styles.paddingHorizontal16]}>
                         {I18n.t('profileinformation', {locale:language})}                     
                        </Text>
                        {this.props.offlineInput}
                        <Button
                            accessibilityLabel="profile-information-save-button"
                            testID="profile-information-save-button"
                            raised
                            title={this.props.keyFrom ? 
                                   I18n.t('Save', {locale:language})                    
                                   : 
                                   I18n.t('Save', {locale:language}) 
                            }
                            backgroundColor="#ed1c24"
                            borderRadius={4}
                            containerViewStyle={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                            onPress={this.props.handleSubmitOffline} />
                    </ScrollView>
                    }
                </View>
            </View>
        );
    }
}

ProfileInformation.defaultProps = defaultProps;

ProfileInformation.propTypes = propTypes;

export default ProfileInformation;
