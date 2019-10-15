import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import Config from "react-native-config";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";

import Toolbar from "../../../components/Toolbar";
import {navigateTo} from "../../../utils/utility";
import {ProfileIcons, googleIcons} from "../../../assets";
import translate, {setLocale} from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    loginForm: PropTypes.element,
    onLogin: PropTypes.func,
    handleSignInWithGoogle: PropTypes.func
};

const defaultProps = {
    loginForm: (<Text>Login Form</Text>),
    onLogin: () => {},
    handleSignInWithGoogle: () => {}
};

class Login extends Component<{}> {

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn} />
                <View style={styles.loginWrapper}>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                    {this.props.loginForm}
                    <TouchableOpacity
                        accessibilityLabel="forgot-password-button"
                        testID="forgot-password-button"
                        style={styles.forgotPassButton}
                        onPress={() => navigateTo("forgotPassword")}>
                        <Text style={styles.forgotPassword}>Forgot?</Text>
                    </TouchableOpacity>
                    <Button
                        accessibilityLabel="sign-in-button"
                        testID="sign-in-button"
                        raised
                        title="Sign In"
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.onLogin} />
                    {(Config.APP_TYPE !== "corporate") && (
                        <View style={styles.signUpText}>
                            <Text style={styles.newMemberText}>New Member?</Text>
                            <TouchableOpacity
                                accessibilityLabel="new-member-button"
                                testID="new-member-button"
                                onPress={() => navigateTo("signup")}
                            >
                                <Text style={styles.signupButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>)
                    }
                    <View style={styles.googleViewStyle}>
                        <TouchableOpacity
                            accessibilityLabel="google-sign-in-button"
                            testID="google-sign-in-button"
                            onPress={this.props.handleSignInWithGoogle}
                            style={styles.googleButtonStyle}
                        >
                            <Image source={googleIcons.googleIcon} style={styles.googleIconStyle} />
                            <Text style={styles.googleButtonTextStyle}>Sign In with Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

Login.defaultProps = defaultProps;

Login.propTypes = propTypes;

export default Login;
