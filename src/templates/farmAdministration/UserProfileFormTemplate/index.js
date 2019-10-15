import React, {Component} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";

import Toolbar from "../../../components/Toolbar";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    userRegistrationForm: PropTypes.element,
    handleUpdateUserDetails: PropTypes.func,
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string
};

const defaultProps = {
    userRegistrationForm: (<Text>Login Form</Text>),
    handleUpdateUserDetails: () => {},
    onbackPress: () => {},
    toolbarTitle: ""
};

class UserProfileForm extends Component<{}> {

    render() {
        const {language} = this.props
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={styles.loginWrapper}>
                    <Text style={styles.personalStyles}>Personal Details</Text>
                    {this.props.userRegistrationForm}
                    <Button
                        raised
                        title={I18n.t('save', {locale:language})}                 
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.handleUpdateUserDetails} />
                </View>
            </View>
        );
    }
}

UserProfileForm.defaultProps = defaultProps;

UserProfileForm.propTypes = propTypes;

export default UserProfileForm;
