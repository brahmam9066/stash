import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text} from "react-native";
import Config from "react-native-config";
import {reduxForm, Field} from "redux-form";
// import validator from "validator";

import InputText from "../../../components/InputText";
import ForgotPassword from "../../../templates/authentication/ForgotPasswordTemplate";
import {navigateTo} from "../../../utils/utility";
import {checkUserExist} from "../../../services/authenticate.service";

import styles from "./styles";

class ForgotPasswordContainer extends Component<{}> {

    onSubmit = (values) => {
        if (values && (values.phone || values.email)) {
            const payload = Config.APP_TYPE === "corporate" ? values.email.trim() : parseInt(values.phone.trim());
            checkUserExist(payload, (otp, username) => {
                navigateTo("verifyOtp", {username, comingFrom: "forgotPassword"});
            });
        }
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
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
            <View style={styles.loginStyle}>
                <Field
                    name={Config.APP_TYPE === "corporate" ? "email" : "phone"}
                    label={Config.APP_TYPE === "corporate" ? "Email" : "Mobile Number"}
                    component={this.renderTextInput} />
            </View>);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View style={styles.appContainer}>
                <ForgotPassword loginForm={this.renderLoginForm()} handleForgotPassword={handleSubmit(this.onSubmit)} />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.email && Config.APP_TYPE === "corporate") {
        errors.email = "Email is required";
    }
    if (!values.phone && Config.APP_TYPE !== "corporate") {
        errors.phone = "Phone number is required";
    }
    return errors;
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "forgotpassword", validate})
)(ForgotPasswordContainer);
