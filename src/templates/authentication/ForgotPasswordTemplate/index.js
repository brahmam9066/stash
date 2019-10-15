import React, {Component} from "react";
import {Text, View} from "react-native";
import Config from "react-native-config";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";

import {ProfileIcons} from "../../../assets";
import Toolbar from "../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    loginForm: PropTypes.element,
    handleForgotPassword: PropTypes.func
};

const defaultProps = {
    loginForm: (<Text>Login Form</Text>),
    handleForgotPassword: () => {}
};

class ForgotPassword extends Component<{}> {

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn} />
                <View style={styles.loginWrapper}>
                    <Text style={styles.welcomeText}>Forgot Password</Text>
                    <Text style={styles.registeredMobileNumber}>Please enter your Registered mooOn mobile number</Text>
                    <Text style={styles.registeredMobileNumber}>and we will send an SMS.</Text>
                    {this.props.loginForm}
                    <Button
                        raised
                        title="Send"
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.handleForgotPassword} />
                    <Text style={styles.receiveSmsText}>You'll receive an OTP to verify your mobile number.</Text>
                </View>
            </View>
        );
    }
}

ForgotPassword.defaultProps = defaultProps;

ForgotPassword.propTypes = propTypes;

export default ForgotPassword;
