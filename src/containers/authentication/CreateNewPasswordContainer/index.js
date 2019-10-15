import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";

import InputText from "../../../components/InputText";
import CreateNewPassword from "../../../templates/authentication/CreateNewPasswordTemplate";
import {navigateTo} from "../../../utils/utility";
import {resetPasswordRequest} from "../../../services/authenticate.service";

import styles from "./styles";

class CreateNewPasswordContainer extends Component<{}> {

    onSubmit = (values) => {
        if (values && values.newPassword) {
            const payload = {
                key: this.props.otp,
                newPassword: values.newPassword
            };
            resetPasswordRequest(payload, () => {
                navigateTo("login");
            });
        }
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, labelStyle, label, secureTextEntry, isPasswordType, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    labelStyle={labelStyle}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    isPasswordType={isPasswordType}
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
                    name="newPassword"
                    label="New Password"
                    isPasswordType={true}
                    secureTextEntry={true}
                    component={this.renderTextInput} />
                <Text style={styles.passwordStrength}>Password Strength:</Text>
                <Field
                    name="confirmPassword"
                    label="Confirm Password"
                    secureTextEntry={true}
                    isPasswordType={true}
                    labelStyle={styles.confirmLabelStyle}
                    component={this.renderTextInput} />
            </View>);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View style={styles.appContainer}>
                <CreateNewPassword loginForm={this.renderLoginForm()} onLogin={handleSubmit(this.onSubmit)} />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.newPassword) {
        errors.newPassword = "Password is required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = "Confirm Password is not correct";
    }
    return errors;
};

const mapStateToProps = state => ({
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "createPassword", validate})
)(CreateNewPasswordContainer);
