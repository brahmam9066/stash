import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import Config from "react-native-config";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";

import ModalSmall from "../../../components/ModalSmall";
import Toolbar from "../../../components/Toolbar";
import CheckBox from "../../../components/CheckBox";
import {navigateTo} from "../../../utils/utility";
import {ProfileIcons} from "../../../assets";

import styles from "./styles";

const propTypes = {
    signupForm: PropTypes.element,
    onSignup: PropTypes.func
};

const defaultProps = {
    signupForm: (<Text>Login Form</Text>),
    onSignup: () => {}
};

class Register extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            isAgreeTerms: false,
            showModal: false,
            checked: false
        };
    }

    componentWillUnmount() {
        this.setState({
            showModal: false
        });
    }

    openTermsModal = () => {
        this.setState({
            showModal: true
        });
    }

    closeTermsModal = () => {
        this.setState({
            showModal: false,
            isAgreeTerms: false,
            checked: false
        });
    }

    acceptTermsAndCondition = () => {
        this.setState({
            showModal: false,
            isAgreeTerms: true,
            checked: true
        });
    }

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn} />
                <View style={styles.signupWrapper}>
                    <Text style={styles.welcomeText}>Welcome!</Text>
                    {this.props.signupForm}
                    <CheckBox
                        title="I agree to stellapps Term of Use and Privacy Policy"
                        checked={this.state.isAgreeTerms}
                        onPress={this.openTermsModal}
                    />
                    <Button
                        disabled={!this.state.isAgreeTerms}
                        raised
                        title="Sign Up"
                        backgroundColor={this.state.isAgreeTerms ? "#ed1c24" : "#bbbbbb"}
                        borderRadius={4}
                        containerViewStyle={styles.signupButtonStyle}
                        textStyle={styles.signupTextStyle}
                        onPress={this.props.onSignup} />
                    <View style={styles.signUpText}>
                        <Text style={styles.newMemberText}>Already Member?</Text>
                        <TouchableOpacity onPress={() => navigateTo("login")}>
                            <Text style={styles.signupButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.checked && <Text style={styles.veryfySmsTextStyle}>You will receive an OTP to verify your mobile number.</Text>}
                </View>
                {this.state.showModal
                    && <ModalSmall
                        showModal={this.state.showModal}
                        title="Terms of Use"
                        content="By downloading, browsing, accessing or using this mooOn mobile application, you agree to be bound by these Terms and Conditions of Use. We reserve the right to amend these terms and conditions at any time. If you disagree with any of these Terms and Conditions of Use, you must immediately discontinue your access to the Mobile Application and your use of the services offered on the Mobile Application."
                        buttonCancelText="Don't Agree"
                        buttonOkText="Agree"
                        onPressCancel={this.closeTermsModal}
                        onPressOk={this.acceptTermsAndCondition}
                    />
                }
            </View>
        );
    }
}


Register.defaultProps = defaultProps;

Register.propTypes = propTypes;

export default Register;
