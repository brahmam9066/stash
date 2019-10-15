import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, ScrollView} from "react-native";
import {reduxForm, Field} from "redux-form";
import Geocoder from 'react-native-geocoding';

import ListPicker from "../../../../components/ListPicker";
import InputText from "../../../../components/InputText";
import FarmProfileForm from "../../../../templates/farmAdministration/FarmProfileFormTemplate";
import {getUserDetailsAction} from "../../../../actions/farmAdmin.actions";
import {getCattlesMetaDataAction} from "../../../../actions/registerAnimal.actions";
import {createFarmAction, updateFarmAction, getFarmListAction, emptyFarmListAction, getOrgTypeAction} from "../../../../actions/registerAnimal.actions";
import {navigateBack, navigateTo} from "../../../../utils/utility";

import styles from "./styles";

class FarmProfileFormContainer extends Component<{}> {

    componentDidMount(){
        Geocoder.init('AIzaSyCl93SDEOHlEz0O0NO-4M4b06zL6FX-Jtc');
        this.props.handleGedOrgTypes(this.props.token);
        Geocoder.from("hassan")
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
        })
        .catch(error => console.warn(error));
    }

    onSubmit = (values) => {
        const {isEditFarmDetails, userDetails} = this.props;
        const payload = {
            addresses: [
                {
                    contactPersonPhone: values.contactPersonPhone,
                    address1: values.address1,
                    address2: values.address2,
                    landmark: values.landmark,
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
            stellaCode: values.stellaCode,
            name: values.name,
            orgType: values.orgType,
            parentId: userDetails.userInfo.subOrgs[0]
        };
        console.log(payload);
        if (isEditFarmDetails) {
            payload.id = values.id;
            this.props.handleUpdateFarm(this.props.token, payload).then((data) => {
                if (data) {
                    this.props.handleEmptyFarmList();
                    this.props.handleGetFarmList(this.props.token);
                    navigateBack();
                }
            });
        } else {
            this.props.handleCreateFarm(this.props.toke, payload).then((data) => {
                if (data) {
                    this.props.handleEmptyFarmList();
                    this.props.handleGetFarmList(this.props.token);
                    navigateTo("farmDetails");
                }
            });
        }
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, id, input: {onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    id={id}
                    selectedValue={value}
                    onValueChange={(val) => {
                        onChange(val);
                    }}
                    {...inputProps}
                    {...pickerProps}>
                    {children}
                </ListPicker>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, isPasswordType, editable, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                    editable={editable}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderPickerItems = (list) => {
        return list.map((item, index) => {
            return (
                <Picker.Item key={index} label={item.label} value={item.value} />
            );
        });
    }

    createObjectFromMetaData = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item.name, value: item.name});
        });
        return object;
    }

    renderRegistrationForm = () => {
        return (
            <View style={styles.loginFormStyle}>
                <Field
                    name="stellaCode"
                    label="Farm Id"
                    editable={!this.props.isEditFarmDetails || !this.props.farmDetails.stellaCode}
                    component={this.renderTextInput} />
                <Field
                    id="org-type"
                    name="orgType"
                    label="Org Type"
                    component={this.renderListPicker}>
                    <Picker.Item label="Select" value="" />
                    {this.renderPickerItems(this.createObjectFromMetaData(this.props.orgTypes))}
                </Field>
                <Field
                    name="name"
                    label="Farm Name"
                    component={this.renderTextInput} />
                <Field
                    name="postalCode"
                    label="Pin Code"
                    maxLength={6}
                    keyboardType="number-pad"
                    component={this.renderTextInput} />
                <Field
                    name="address1"
                    label="Address Line1"
                    component={this.renderTextInput} />
                <Field
                    name="address2"
                    label="Address Line2"
                    component={this.renderTextInput} />
                <Field
                    name="landmark"
                    label="Landmark"
                    component={this.renderTextInput} />
                <Field
                    name="contactPersonPhone"
                    label="Contact Number"
                    keyboardType="phone-pad"
                    maxLength={12}
                    minLength={10}
                    component={this.renderTextInput} />
                <View style={styles.row}>
                    <View style={styles.width49}>
                        <Field
                            name="cityOrVillage"
                            label="City"
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            id="state"
                            name="state"
                            label="State"
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            <Picker.Item key="karnataka" label="karnataka" value="karnataka" />
                            <Picker.Item key="Tamil Nadu" label="Tamil Nadu" value="Tamil Nadu" />
                        </Field>
                    </View>
                </View>
            </View>);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View style={styles.appContainer}>
                <FarmProfileForm
                    toolbarTitle="Farm Profile"
                    onbackPress={navigateBack}
                    FarmProfileRegistrationForm={this.renderRegistrationForm()}
                    handleFarmRegistration={handleSubmit(this.onSubmit)} />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.stellaCode) {
        errors.stellaCode = "Stella code is required";
    }
    if (!values.orgType) {
        errors.orgType = "Org Type is required";
    }
    if (!values.name) {
        errors.name = "Farm Name is required";
    }
    if (!values.postalCode) {
        errors.postalCode = "Postal code is required";
    }
    if (!values.address1) {
        errors.address1 = "address is required";
    }
    if (!values.phone) {
        errors.phone = "phone number is required";
    } else if (values.phone && values.phone.length !== 10) {
        errors.phone = "phone number must be of 10 digits";
    }
    if (!values.cityOrVillage) {
        errors.cityOrVillage = "city is required";
    }
    if (!values.state) {
        errors.state = "state is required";
    }
    return errors;
};

constructInitialValue = (farmDetails) => ({
    id: farmDetails.id,
    stellaCode: farmDetails.stellaCode,
    name: farmDetails.name,
    contactPersonPhone: farmDetails.addresses[0].contactPersonPhone,
    orgType: farmDetails.orgType,
    address1: farmDetails.addresses[0].address1,
    address2: farmDetails.addresses[0].address2,
    landmark: farmDetails.addresses[0].landmark,
    postalCode: farmDetails.addresses[0].postalCode,
    cityOrVillage: farmDetails.addresses[0].cityOrVillage,
    state: farmDetails.addresses[0].state
});

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    orgTypes: state.animalMgmtReducer.orgTypes,
    userDetails: state.farmAdminReducer.userDetails,
    farmDetails: state.animalMgmtReducer.farmDetails,
    initialValues: ownProps.isEditFarmDetails ? constructInitialValue(state.animalMgmtReducer.farmDetails) : {}
});

const mapDispatchToProps = dispatch => ({
    handleGedOrgTypes: (token) => dispatch(getOrgTypeAction(token)),
    handleCreateFarm: (token, payload) => dispatch(createFarmAction(token, payload)),
    handleUpdateFarm: (token, payload) => dispatch(updateFarmAction(token, payload)),
    handleGetFarmList: (token) => dispatch(getFarmListAction(token)),
    handleEmptyFarmList: () => dispatch(emptyFarmListAction())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "farmRegistration", validate})
)(FarmProfileFormContainer);
