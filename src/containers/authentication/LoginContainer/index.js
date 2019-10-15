import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text} from "react-native";
import Config from "react-native-config";
import {reduxForm, Field} from "redux-form";
import {GoogleSignin, statusCodes} from "react-native-google-signin";

import InputText from "../../../components/InputText";
import Login from "../../../templates/authentication/LoginTemplate";
import {userLoginRequest, userLoginWithGoogleRequest} from "../../../services/authenticate.service";
import {setUserLoggedInAction} from "../../../actions/auth.actions";

import styles from "./styles";

class LoginContainer extends Component<{}> {

    state = {
        userInfo: null
    }

    componentDidMount() {
        this._configureGoogleSignIn();
    }

    _configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: "715281156885-mlbqrkt4l7mp1jf5m7i8q424unaocura.apps.googleusercontent.com",
            offlineAccess: true
        });
    }

    onSignInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            userLoginWithGoogleRequest(userInfo.accessToken, (data) => {
                this.props.setUserLoggedIn(data);
            });
            this.setState({userInfo});
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("here 1");
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("here 2");
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("here 3");
                // play services not available or outdated
            } else {
                console.log("here 4", error);
                // some other error happened
            }
        }
    };

    onSubmit = (values) => {
        userLoginRequest(values, (data) => {
            if (data) {
                this.props.setUserLoggedIn(data);
            }
        });
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, id, isPasswordType, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    id={id}
                    onChangeText={onChange}
                    maxLength={maxLength}
                    isPasswordType={isPasswordType}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderLoginForm = () => {
        return (
            <View>
                <Field
                    id="username"
                    name="username"
                    keyboardType={Config.APP_TYPE === "corporate" ? "none" : "phone-pad"}
                    label={Config.APP_TYPE === "corporate" ? "Registered HAIS Email ID" : "Registered mooOn Mobile Number"}
                    component={this.renderTextInput} />
                <Field
                    id="password"
                    name="password"
                    isPasswordType={true}
                    secureTextEntry={true}
                    label={Config.APP_TYPE === "corporate" ? "HAIS Password" : "mooOn Password"}
                    component={this.renderTextInput} />
            </View>);
    }

    render() {
        console.log(this.state.userInfo);
        const {handleSubmit} = this.props;
        return (
            <View style={styles.appContainer}>
                <Login
                    loginForm={this.renderLoginForm()}
                    onLogin={handleSubmit(this.onSubmit)}
                    handleSignInWithGoogle={this.onSignInWithGoogle} />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.email && Config.APP_TYPE === "corporate") {
        errors.email = "Email is required";
    }
    if (!values.phone && !values.username && Config.APP_TYPE !== "corporate") {
        errors.phone = "Mobile Number is required";
        errors.username = "Mobile Number is required";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }
    return errors;
};

const mapStateToProps = state => ({
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    setUserLoggedIn: payload => dispatch(setUserLoggedInAction(payload))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "login", validate})
)(LoginContainer);
