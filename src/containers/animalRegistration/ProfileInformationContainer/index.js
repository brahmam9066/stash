import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import PropTypes from "prop-types"; import {View, Text, Picker} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";

import {isPaidUser} from "../../../config/settings";
import authenticatedLayer from "../../authenticatedLayer";
import InputText from "../../../components/InputText";
import AutoComplete from "../../../components/AutoComplete";
import ListPicker from "../../../components/ListPicker";
import DatePickerAndroid from "../../../components/DatePicker/DatePicker.android";
import RadioButton from "../../../components/RadioButton";
import ProfileInformation from "../../../templates/registerAnimalTemplates/ProfileInformation";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {getCattlesMetaDataAction, createCattleProfileInfoAction, updateCattleProfileInfoAction, getOrgTypeAction, searchOrgAction} from "../../../actions/registerAnimal.actions";
import {updateCalfProfileInfoAction} from "../../../actions/breedModule.actions";
import {Actions} from "react-native-router-flux";

import styles from "./styles";
import CalfBirth from "../../../templates/breedModules/calfBirthTemplates/CalfBirth";
import  I18n from "../../../utils/language.utils";

const propTypes = {
    comingFrom: PropTypes.string,
    token: PropTypes.string,
    calfBirthDetails: PropTypes.object,
    userDetails: PropTypes.object,
    animalDetails: PropTypes.object,
    handleUpdateCattleProfileInfo: PropTypes.func,
    handleUpdateCalfProfileInfo: PropTypes.func,
    handleCreateCattleProfileInfo: PropTypes.func,
    isEditProfileInfo: PropTypes.bool,
    disabled: PropTypes.bool
};

const defaultProps = {
    comingFrom: "",
    token: "",
    calfBirthDetails: {},
    animalDetails: {},
    userDetails: {},
    isEditProfileInfo: false,
    handleUpdateCattleProfileInfo: () => {},
    handleUpdateCalfProfileInfo: () => {},
    handleCreateCattleProfileInfo: () => {},
    disabled: false
};

class ProfileInformationContainer extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            // radioButtonValue: "farmBred",
            radioButtonValue: Actions.currentScene === "animalDetails" ?( this.props.initialValues.isPurchased ? "purchased": "farmBred"):"farmBred",
            genderOffline:"",
            sexList: [
                {label: "Male", value: "MALE"},
                {label: "Female", value: "FEMALE"}
            ],
            birthList: [
                {label: "Natural", value: "NATURAL"},
                {label: "Assisted", value: "ASSISTED"}
            ]
        };
    }

    componentDidMount() {
        this.props.dispatch(getOrgTypeAction(this.props.token)).then(()=>{
            if(this.props.comingFrom = "farmDetails") {
                this.props.handleSetPropertyValue("orgName", this.props.orgDetails.orgName);
                this.props.handleSetPropertyValue("orgId", this.props.orgDetails.orgId);
                this.props.handleSetPropertyValue("orgtype", this.props.orgDetails.orgType);
            }
        });
        // this.props.dispatch(getAllOrgAction(this.props.token)).then((data)=>{
        //     console.log("Dataaaaaaaaa",data);
        // });
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps && nextProps.initialValues) {
        //     this.setState({
        //         radioButtonValue: nextProps.initialValues.isPurchased ? "purchased" : "farmBred"
        //     });
        // }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    onSubmitOffline = (values)=>{
        console.log("values in profile information offline",values)
        const convertUTC = moment.utc(values.dob);
        const dateformat = moment(convertUTC).format("YYYY-MM-DD");
        const {userDetails, animalDetails, calfBirthDetails} = this.props;
        /*
        * If App type is corporate then the orgID should be selected from the OrgType dropdown
        * else It should be users rootOrgID.
        */
        let organizationId = userDetails.userInfo ? userDetails.userInfo.rootOrgId : "";
        if (isPaidUser()) {
            organizationId = values.orgId;
        }
        const mother = {
            breed: values.mother ? values.mother.breed : null,
            stellaCode: values.mother ? values.mother.stellaCode : null
        };
        const father = {
            breed: values.father ? values.father.breed : null,
            stellaCode: values.father ? values.father.stellaCode : null
        };
        const payload = {
            ageAtOnboarding: values.ageAtOnboarding,
            stellaCode: values.stellaCode,
            birthType: values.birthType,
            breed: values.breed,
            dob: dateformat,
            gender: values.gender,
            isPurchased: this.state.radioButtonValue === "purchased",
            livestockState: values.livestockState,
            species: values.species,
            subOrgs: [
                organizationId
            ],
            lactationState: values.lactationState,
            breedingState: values.breedingState,
            mother,
            father,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        console.log(payload);
        if (!this.props.isInternetConnected) {
            console.log("payload isInternetConnected",payload,this.props.comingFromOffline);
            if (this.props.comingFromOffline === "cattleRegistrationOfflineList") {
                payload._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_CATTLE_REGISTRATION_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_CATTLE_REGISTRATION_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack();
            return false;
        }
        
        // console.log("values in profile information",values)
        // navigateBack();
    }

    onSubmit = (values) => {
        const convertUTC = moment.utc(values.dob);
        const dateformat = moment(convertUTC).format("YYYY-MM-DD");
        const {userDetails, animalDetails, calfBirthDetails} = this.props;
        /*
        * If App type is corporate then the orgID should be selected from the OrgType dropdown
        * else It should be users rootOrgID.
        */
        let organizationId = userDetails.userInfo ? userDetails.userInfo.rootOrgId : "";
        if (isPaidUser()) {
            organizationId = values.orgId;
        }
        const mother = {
            breed: values.mother ? values.mother.breed : null,
            stellaCode: values.mother ? values.mother.stellaCode : null
        };
        const father = {
            breed: values.father ? values.father.breed : null,
            stellaCode: values.father ? values.father.stellaCode : null
        };
        const payload = {
            ageAtOnboarding: values.ageAtOnboarding,
            stellaCode: values.stellaCode,
            birthType: values.birthType,
            breed: values.breed,
            dob: dateformat,
            gender: values.gender,
            isPurchased: this.state.radioButtonValue === "purchased",
            livestockState: values.livestockState,
            species: values.species,
            subOrgs: [
                organizationId
            ],
            mother,
            father,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        console.log(payload);
        if (this.props.isEditProfileInfo && this.props.comingFrom === "calfDetails") {
            payload.id = calfBirthDetails.id;
            console.log("edit", payload);
            this.props.handleUpdateCalfProfileInfo(payload, this.props.token).then((data) => {
                if (data) {
                    navigateBack();
                }
            });
        } else if (this.props.isEditProfileInfo && this.props.comingFrom !== "calfDetails") {
            payload.id = animalDetails.id;
            console.log("edit", payload);
            this.props.handleUpdateCattleProfileInfo(payload, this.props.token).then((data) => {
                console.log("response edit", payload);
                if (data) {
                    navigateBack();
                }
            });
        } else {
            console.log("create", payload);
            payload._id = this.props.initialValues ? this.props.initialValues._id  :""
            this.props.dispatch(createCattleProfileInfoAction(payload, this.props.token)).then(() => {
                // navigateTo("breedInformation");
                navigateTo("breedInformation", {comingFrom: "breedinfo"});

            });
        }
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, id, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    id={id}
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

    onChangeAutoSelect = (value, onChange) => {
        const {orgtype} = this.props;
        this.props.dispatch(searchOrgAction(orgtype, value, this.props.token));
        onChange(value);
    }

    renderAutoSelect = (field) => {
        const {meta: {touched, error}, id, pickerItemId, label, onPressListItem, secureTextEntry, dataList, editable, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <AutoComplete
                    id={id}
                    pickerItemId={pickerItemId}
                    onChangeText={(val) => {
                        this.onChangeAutoSelect(val, onChange);
                    }}
                    maxLength={maxLength}
                    dataList={dataList}
                    editable={editable}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    onPressListItem={onPressListItem}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderDatePicker = (field) => {
        const {meta: {touched, error}, id, datePickerButtonId, label, secureTextEntry, maxDate, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <DatePickerAndroid
                    id={id}
                    datePickerButtonId={datePickerButtonId}
                    onChangeText={onChange}
                    onChangeDate={date => onChange(date)}
                    maxLength={maxLength}
                    maxDate={maxDate}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput}
                    enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    disabled={this.props.isEditProfileInfo && this.props.userDetails.authorities  && (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") || this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER"))}
                    />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, id, input: {name,onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    id={id}
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (!this.props.isInternetConnected && name === "gender") {
                            this.setState({genderOffline : val});
                        }
                        onChange(val);
                        this.setState({val});
                    }}
                    {...inputProps}
                    {...pickerProps}>
                    {children}
                </ListPicker>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderSpeciesListPicker = (field) => {
        const {meta: {touched, error}, id, input: {onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    id={id}
                    selectedValue={value}
                    onValueChange={(val) => {
                        onChange(val);
                        this.props.dispatch({type: "RESET_PROPERTY_VALUE", property: "breed"});
                    }}
                    {...inputProps}
                    {...pickerProps}>
                    {children}
                </ListPicker>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    onChangeRadio = (value) => {
        this.setState({
            radioButtonValue: value
        });
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

    createObjectFromMetaDataForLiveStockState = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item.charAt(0) + item.slice(1).toLowerCase(), value: item});
        });
        return object;
    }

    onPressOrgName = (org) => {
        this.props.handleSetPropertyValue("orgName", org.name);
        this.props.handleSetPropertyValue("orgId", org.id);
        this.props.handleEmptyOrgNameList();
    }

    onChangeAge = (age) => {
        const dob = moment().subtract(age, "months").format("YYYY-MM-DD");
        this.props.handleSetPropertyValue("dob", dob);
    }

    onChangeDob = (dob) => {
        console.log(dob);
        const age = moment().diff(moment(dob, "YYYY-MM-DD"), "months");
        this.props.handleSetPropertyValue("ageAtOnboarding", `${age}`);
    }

    renderHmbForm = () => {
        const {orgtype} = this.props;
        const orgtypeList = this.createObjectFromMetaData(this.props.orgTypes);
        return (
            <View style={styles.hmbFormMainStyle}>
                <Text style={styles.hmbTextStyle}>Choose HMB</Text>
                <View style={styles.hmbFormStyle}>
                    <View style={styles.width100}>
                        <Field
                            id="org-type"
                            name="orgtype"
                            label="Org Type"
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(orgtypeList)}
                        </Field>
                    </View>

                    {orgtype &&
                        <View style={[styles.width100]}>
                            <Field
                                id="org-name"
                                pickerItemId="org-name-picker-item-button"
                                name="orgName"
                                label={orgtype}
                                dataList={this.props.orgNameList}
                                onPressListItem={this.onPressOrgName}
                                component={this.renderAutoSelect} />
                        </View>
                    }
                </View>
            </View>
        );
    }

    renderProfileForm = () => {
        const {cattlesMetadata, initialValues, language} = this.props;
        let breedList = [];
        if (this.props.species && cattlesMetadata && cattlesMetadata.BREED && cattlesMetadata.BREED.length > 0) {
            const breedArray = cattlesMetadata.BREED.filter((breed) => {
                return (breed.species.toLowerCase()).includes(this.props.species[0].toLowerCase());
            });
            breedList = this.createObjectFromMetaData(breedArray);
        }
        const speciesList = (cattlesMetadata && cattlesMetadata.SPECIES) ? this.createObjectFromMetaData(cattlesMetadata.SPECIES) : [];
        const liveStockStateList = (cattlesMetadata && cattlesMetadata.LIVESTOCK_STATES) ? this.createObjectFromMetaDataForLiveStockState(cattlesMetadata.LIVESTOCK_STATES) : [];
        const lactationList = (cattlesMetadata && cattlesMetadata.LACTATION_STATES) ? this.createObjectFromMetaData(cattlesMetadata.LACTATION_STATES) : [];
        const breedingStateList = (cattlesMetadata && cattlesMetadata.BREEDING_STATES) ? this.createObjectFromMetaData(cattlesMetadata.BREEDING_STATES) : [];
        return (
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <RadioButton
                            id="farm-bred"
                            name="farmBred"
                            label= {I18n.t('farmBred', {locale:language})}
                            value={this.state.radioButtonValue}
                            onPress={() => this.onChangeRadio("farmBred")} />
                    </View>
                    <View style={styles.width50}>
                        <RadioButton
                            id="purchased"
                            name="purchased"
                            label= {I18n.t('purchased', {locale:language})}
                            value={this.state.radioButtonValue}
                            onPress={() => this.onChangeRadio("purchased")} />
                    </View>
                </View>
                <View style={styles.width100}>
                    <Field
                        id="stella-code"
                        name="stellaCode"
                        editable={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" && this.props.initialValues.stellaCode || (this.props.initialValues.stellaCode ? !this.props.isEditProfileInfo : this.props.isEditProfileInfo)}
                        label= {I18n.t('registrationId', {locale:language})}
                        component={this.renderTextInput} />
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            id="gender"
                            name="gender"
                            label= {I18n.t('gender', {locale:language})}
                            enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.sexList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            id="birth-type"
                            name="birthType"
                            label= {I18n.t('typeOfBirth', {locale:language})}
                            enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.birthList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            id="age-at-onboarding"
                            name="ageAtOnboarding"
                            label= {I18n.t('ageInMonths', {locale:language})}
                            editable={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            format={value => (value ? `${value}` : "")}
                            onChange={this.onChangeAge}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            id="dob"
                            datePickerButtonId="dob-button"
                            name="dob"
                            label= {I18n.t('dob', {locale:language})}
                            onChange={this.onChangeDob}
                            component={this.renderDatePicker} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            id="species"
                            name="species"
                            label= {I18n.t('species', {locale:language})}
                            enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}                            
                            component={this.renderSpeciesListPicker}>
                            <Picker.Item label="Select" value="cow" disabled/>
                            {this.renderPickerItems(speciesList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            id="breed"
                            name="breed"
                            label= {I18n.t('breed', {locale:language})}
                            enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails"  || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(breedList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            id="father-stella-code"
                            name="father.stellaCode"
                            label= {I18n.t('sire', {locale:language})}
                            editable={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            id="father-breed"
                            name="father.breed"
                            label= {I18n.t('sireType', {locale:language})}
                            enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(breedList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            id="mother-stella-code"
                            name="mother.stellaCode"
                            editable={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            label= {I18n.t('dam', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            id="mother-breed"
                            name="mother.breed"
                            label= {I18n.t('damType', {locale:language})}
                            enabled={!this.props.isEditProfileInfo || this.props.comingFrom === "calfDetails" || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(breedList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.width100}>
                    <Field
                        id="live-stock-state"
                        name="livestockState"
                        label= {I18n.t('livestockState', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(liveStockStateList)}
                    </Field>
                </View>
                {
                    !this.props.isInternetConnected &&
                    <View style={styles.width100}>
                            <Field
                                id="lactation-state"
                                name="lactationState"
                                label={I18n.t('lactation', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                {
                                    this.state.genderOffline == "MALE" ? 
                                    <Picker.Item label="None" value="None" />   
                                    :
                                    this.renderPickerItems(lactationList)
                                }
                                
                            </Field>
                        </View>
                }
                {
                    !this.props.isInternetConnected &&
                    <View style={styles.width100}>
                        <Field
                            id="breeding-state"
                            name="breedingState"
                            label={I18n.t('breedingState', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(breedingStateList)}
                        </Field>
                    </View>
                }
            </View>);
    }

    render() {
        const {handleSubmit, isEditProfileInfo,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <ProfileInformation
                    language={this.props.language}
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('registerAnimal', {locale:language})}
                    profileForm={this.renderProfileForm()}
                    hmbForm={this.renderHmbForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    isPaidUser={isPaidUser()}
                    isEditProfileInfo={isEditProfileInfo}
                    keyFrom={this.props.comingFrom}
                    offlineInput={this.renderProfileForm()}
                    handleSubmitOffline={handleSubmit(this.onSubmitOffline)}
                    isInternetConnected={this.props.isInternetConnected}
                />
            </View>
        );
    }
}

ProfileInformationContainer.propTypes = propTypes;

ProfileInformationContainer.defaultProps = defaultProps;

const validate = (values) => {
    const errors = {};
    if (!values.stellaCode) {
        errors.stellaCode = "Registration Id is required";
    } else if (values.stellaCode.length < 4) {
        errors.stellaCode = "Registration Id must contain atleast 4 characters";
    }
    if (!values.gender) {
        errors.gender = "Sex is required";
    }
    if (!values.birthType) {
        errors.birthType = "Type of Birth is required";
    }
    if (!values.ageAtOnboarding && !values.dob) {
        if (!values.ageAtOnboarding) errors.ageAtOnboarding = "Age is required";
        if (!values.dob) errors.dob = "DOB is required";
    }
    if (!values.species) {
        errors.species = "Species is required";
    }
    if (!values.breed) {
        errors.breed = "Breed is required";
    }
    if (!values.livestockState) {
        errors.livestockState = "Live Stock State is required";
    }
    if (!values.lactationState) {
        errors.lactationState = "Lactation State is required";
    }
    return errors;
};

const selector = formValueSelector("profileInformation");

// const constructInitailValuesObject = (animalDetails) => {
//     return {
//         ...animalDetails,
//         ageAtOnboarding: animalDetails.ageAtOnboarding
//     };
// };

const mapStateToProps = (state, ownProps) => ({
    cattlesMetadata: state.lookupDataReducer.cattlesMetadata,
    location:state.healthModuleOfflineReducer.location,
    isInternetConnected: state.appReducer.isInternetConnected,
    cattleOfflineRegistration: state.healthModuleOfflineReducer.cattleOfflineRegistration,
    token: state.authReducer.token,
    cattlesMetadata: state.lookupDataReducer.cattlesMetadata,
    species: selector(state, "species"),
    gender: selector(state, "gender"),
    birthType: selector(state, "birthType"),
    dob: selector(state, "dob"),
    breed: selector(state, "breed"),
    livestockState: selector(state, "livestockState"),
    orgtype: selector(state, "orgtype"),
    userDetails: state.farmAdminReducer.userDetails,
    initialValues: ownProps.isEditProfileInfo ? ownProps.comingFrom === "calfDetails" ? state.breedModuleReducer.calfBirthDetails : state.animalMgmtReducer.animalDetails : ownProps.item,
    animalDetails: state.animalMgmtReducer.animalDetails,
    calfBirthDetails: state.breedModuleReducer.calfBirthDetails,
    orgTypes: state.lookupDataReducer.orgTypes,
    orgNameList: state.animalMgmtReducer.orgNameList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    fetchCattlesMetaData: token => dispatch(getCattlesMetaDataAction(token)),
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_PROFILE_PROPERTY_VALUE", property, value}),
    handleEmptyOrgNameList: () => dispatch({type: "EMPTY_ORG_NAME_LIST"}),
    handleUpdateCattleProfileInfo: (payload, token) => dispatch(updateCattleProfileInfoAction(payload, token)),
    handleUpdateCalfProfileInfo: (payload, token) => dispatch(updateCalfProfileInfoAction(payload, token)),
    handleCreateCattleProfileInfo: (payload, token) => dispatch(createCattleProfileInfoAction(payload, token))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "profileInformation", validate})
)(authenticatedLayer(ProfileInformationContainer));
