import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, ScrollView} from "react-native";
import {reduxForm, Field} from "redux-form";

import ListPicker from "../../../components/ListPicker";
import InputText from "../../../components/InputText";
import FarmProfileForm from "../../../templates/farmAdministration/FarmProfileFormTemplate";
import {farmProfileUpdateAction, farmProfileCreateAction, getUserDetailsAction} from "../../../actions/farmAdmin.actions";
import {getCattlesMetaDataAction} from "../../../actions/registerAnimal.actions";
import {navigateBack, navigateTo} from "../../../utils/utility";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

class FarmProfileFormContainer extends Component<{}> {

    onSubmit = (values) => {
        const {isEditFarmDetails, userDetails} = this.props;
        // const orgId = userDetails.userInfo ? userDetails.userInfo.rootOrgId : "";
        const orgId = values ? values.rootOrgId : "";
        const payload = {
            id: orgId,
            addresses: [
                {
                    address1: values.address1,
                    address2: values.address2,
                    cityOrVillage: values.cityOrVillage,
                    country: "in",
                    district: values.cityOrVillage,
                    lat: 12.8916722,
                    lng: 77.6390063,
                    postalCode: values.postalCode,
                    state: values.state,
                    tehsil: values.cityOrVillage
                }
            ],
            isRootOrg: true,
            name: values.name,
            orgCategory: "Private Dairy Farm",
            subscriptionPlan: null
        };
        if (isEditFarmDetails) {
            this.props.dispatch(farmProfileUpdateAction(orgId, payload, this.props.token)).then((data) => {
                if (data) navigateBack();
            });
        } else {
            this.props.dispatch(farmProfileCreateAction(payload, this.props.token)).then(() => {
                return this.props.dispatch(getUserDetailsAction(this.props.token));
            }).then((data) => {
                if (data) {
                    this.props.dispatch(getCattlesMetaDataAction(this.props.token));
                    navigateTo("farmProfile");
                }
            });
        }
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, input: {onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    selectedValue={value}
                    onValueChange={val => onChange(val)}
                    {...inputProps}
                    {...pickerProps}>
                    {children}
                </ListPicker>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, isPasswordType, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
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

    renderRegistrationForm = () => {
        const {language} = this.props
        return (
            <View style={styles.loginFormStyle}>
                <Field
                    name="name"
                    label={ I18n.t('farmName', {locale:language})}
                    component={this.renderTextInput} />
                <Field
                    name="postalCode"
                    label={ I18n.t('pinCode', {locale:language})}
                    maxLength={6}
                    keyboardType="number-pad"
                    component={this.renderTextInput} />
                <Field
                    name="address1"
                    label={ I18n.t('addressLine1', {locale:language})}
                    component={this.renderTextInput} />
                <Field
                    name="address2"
                    label={ I18n.t('addressLine2', {locale:language})}
                    component={this.renderTextInput} />
                <View style={styles.row}>
                    <View style={styles.width49}>
                        <Field
                            name="cityOrVillage"
                            label={ I18n.t('city', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="state"
                            label={ I18n.t('state', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="" value="" />
                            <Picker.Item label="Karnataka" value="karnataka" />
                            <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                        </Field>
                    </View>
                </View>
            </View>);
    }

    render() {
        const {handleSubmit,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <FarmProfileForm
                    toolbarTitle= {I18n.t('farmProfile', {locale:language})}
                    onbackPress={navigateBack}
                    FarmProfileRegistrationForm={this.renderRegistrationForm()}
                    handleFarmRegistration={handleSubmit(this.onSubmit)} 
                    language={language}/>
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Farm Name is required";
    }
    if (!values.postalCode) {
        errors.postalCode = "Postal code is required";
    }
    if (!values.address1) {
        errors.address1 = "address is required";
    }
    if (!values.cityOrVillage) {
        errors.cityOrVillage = "city is required";
    }
    if (!values.state) {
        errors.state = "state is required";
    }
    return errors;
};

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    initialValues: ownProps.isEditFarmDetails ? state.farmAdminReducer.farmDetails : {}
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "farmProfileRegistration", validate})
)(FarmProfileFormContainer);
