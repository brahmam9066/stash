import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";

import InputText from "../../../components/InputText";
import UserProfileForm from "../../../templates/farmAdministration/UserProfileFormTemplate";
import {updateUserDetailsActions} from "../../../actions/farmAdmin.actions";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {validateEmail} from "../../../utils/form.utils";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

class UserProfileFormContainer extends Component<{}> {

    onSubmit = (values) => {
        console.log("values",values);
        const {userDetails} = this.props;
        if (values) {
            const payload = 
                {
                id: values.id,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                login: this.props.username
                 };
        console.log("payload",payload);
            this.props.dispatch(updateUserDetailsActions(payload, this.props.token)).then((payload) => {
                this.props.dispatch({type: "SET_USER_DETAILS", payload});
                navigateTo("profileDetails");
            });
        }
      
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, isPasswordType, autoCapitalize, value, editable, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    isPasswordType={isPasswordType}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    editable={editable}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderRegistrationForm = () => {
        const {language} = this.props
        return (
            <View style={styles.loginFormStyle}>
                <Field
                    name="firstName"
                    label={ I18n.t('firstName', {locale:language})}
                    component={this.renderTextInput} />
                <Field
                    name="lastName"
                    label={ I18n.t('lastName', {locale:language})}
                    component={this.renderTextInput} />
                <Field
                    name="email"
                    label={ I18n.t('email', {locale:language})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    component={this.renderTextInput} />
                <Field
                    name="login"
                    label={ I18n.t('mobileNumber', {locale:language})}
                    editable={false}
                    component={this.renderTextInput}
                />
            </View>);
    }

    render() {
        const {handleSubmit,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <UserProfileForm
                    toolbarTitle={ I18n.t('userRegistration', {locale:language})}
                    onbackPress={navigateBack}
                    userRegistrationForm={this.renderRegistrationForm()}
                    handleUpdateUserDetails={handleSubmit(this.onSubmit)} 
                    language={language}/>
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
        errors.lastName = "Last Name is required";
    }
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!validateEmail(values.email)) {
        console.log("poop stuff")
        errors.email = "Email invalid";
    }
    return errors;
};

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    language: state.localeReducer.language,
    userDetails: state.farmAdminReducer.userDetails,
    username: state.authReducer.username,
    initialValues: ownProps.isEditUserDetails ? state.farmAdminReducer.userDetails : {login: `${state.authReducer.username}`}
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "userRegistration", validate})
)(UserProfileFormContainer);
