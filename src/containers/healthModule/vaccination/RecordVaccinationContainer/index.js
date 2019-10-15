import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, TouchableOpacity,BackHandler} from "react-native";
import {Icon} from "react-native-elements";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import ListPicker from "../../../../components/ListPicker";
import AutoComplete from "../../../../components/AutoComplete";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordVaccination from "../../../../templates/healthModule/vaccinationTemplates/RecordVaccination";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {getVaccineListAction, createVaccinationAction, updateVaccinationAction, getVaccinationListAction} from "../../../../actions/healthModule.actions";
import {resetImagesForRecordAction} from "../../../../actions/imageUpload.action";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

class RecordVaccinationContainer extends Component<{}> {

    state = {
        stellaCode: "",
        offlineValue: "",
        cattleDetails: {},
        doneByList: [
            {label: "GovtDoctor", value: "GovtDoctor"},
            {label: "PvtDoctor", value: "PvtDoctor"},
            {label: "Self", value: "Self"}
        ],
        routeList: [
            {label: "IM", value: "IM"},
            {label: "IV", value: "IV"}
        ]
    }

    componentDidMount() {
        if (this.props.isEditVaccination) {
            this.setState({
                stellaCode: this.props.initialValues.cattle ? this.props.initialValues.cattle.stellaCode : "",
                cattleDetails: this.props.initialValues.cattle ? this.props.initialValues.cattle : {}
            });
        }
        this.props.handleEmptyVaccineList();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        this.props.reset();
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack();
        return true;
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        this.setState({
            stellaCode: item.stellaCode,
            cattleDetails: item
        });
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    onSubmit = (values) => {
        const convertutcreatmentDate = moment.utc(values.treatmentDate);
        const dateformattreatmentDate = moment(convertutcreatmentDate).format("YYYY-MM-DD");
        const payload = {
            note: "",
            treatmentDate: dateformattreatmentDate,
            disease: values.disease,
            serviceFee: values.serviceFee,
            serviceTax: "",
            totalFee: "",
            performedBy: values.performedBy,
            cattle: {
                stellaCode: this.state.stellaCode
            },
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };

        if (!this.props.isInventory && this.props.isMedicineSearch) {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicineName: values.medicine.medicineName,
                    routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else if (this.props.isInventory) {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicine: {id: values.medicine.id},
                    routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicineName: values.medicineName,
                    routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        }
        if (this.props.isEditVaccination && this.props.initialValues.id) {
            payload.id = this.props.initialValues.id;
            payload.prescriptions[0].id = this.props.initialValues.prescriptions[0].id;
            this.props.dispatch(updateVaccinationAction(payload, this.props.token)).then((data) => {
                if (data) {
                    this.props.handleEmptyVaccination();
                    this.props.handleGetVaccinationList(this.props.token);
                    navigateBack();
                }
            });
        } else {
            this.props.dispatch(createVaccinationAction(payload, this.props.token)).then((data) => {
                if (data) {
                    this.props.handleEmptyVaccination();
                    this.props.handleGetVaccinationList(this.props.token);
                    this.props.handleEmptyImages();
                    navigateTo("vaccinationDetails");
                }
            });
        }
    };

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, editable, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderDatePicker = (field) => {
        const {meta: {touched, error}, label, maxDate, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <DatePickerAndroid
                    onChangeText={onChange}
                    onChangeDate={date => onChange(date)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    maxDate={maxDate}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, input: {name, onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (this.props.isInventory && name === "symptom") {
                            this.props.handleSetPropertyValue("diagnosis", "");
                        }
                        if (this.props.isInventory && name === "medicine.id") this.onChangeVaccine(val);
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

    renderAutoSelect = (field) => {
        const {meta: {touched, error}, id, pickerItemId, label, onPressListItem, secureTextEntry, dataList, editable, maxLength, keyboardType, placeholder, onBlur, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <AutoComplete
                    id={id}
                    pickerItemId={pickerItemId}
                    onChangeText={(val) => {
                        this.onChangeAutoSelect(val, onChange);
                    }}
                    onBlur={onBlur}
                    labelText={styles.labelText}
                    listLabelKey="medicineName"
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

    onChangeAutoSelect = (value, onChange) => {
        this.props.handleGetVaccineList(this.props.token, value);
        onChange(value);
    }

    onChangeVaccine = (value) => {
        const {handleSetPropertyValue, vaccineList, handleEmptyVaccineList} = this.props;
        if (value) {
            if(typeof value === "string"){
                value = vaccineList.filter(item => (item.id === value))[0];
            }
            handleSetPropertyValue("medicine", value);
            handleSetPropertyValue("unit", value.unit);
            handleSetPropertyValue("unitPrice", `${value.sellingPricePerUnit}`);
            handleSetPropertyValue("routeOfAdministration", value.routeOfAdministration);
            handleSetPropertyValue("medicineName", value.medicineName);
            handleEmptyVaccineList();
        }
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
            object.push({label: item.name, value: item.name.toLowerCase()});
        });
        return object;
    }

    createObjectFromFrequencyList = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item, value: item});
        });
        return object;
    }

    createObjectFromVaccineList = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item.medicineName, value: item.id});
        });
        return object;
    }

    renderMedicineField = () => {
        if (this.props.isMedicineSearch && this.props.isInternetConnected) {
            return (
                <Field
                    id="medicine-name"
                    pickerItemId="medicine-picker"
                    name="medicine.medicineName"
                    label="Vaccine"
                    dataList={this.props.vaccineListSearch}
                    onPressListItem={this.onChangeVaccine}
                    component={this.renderAutoSelect}/>
            );
        } else if (this.props.isInventory){
            return (
                <Field
                    name="medicine.id"
                    label="Vaccine"
                    component={this.renderListPicker}>
                    <Picker.Item label="Select" value="" />
                    {this.renderPickerItems(this.createObjectFromVaccineList(this.props.vaccineList))}
                </Field>
            );
        } else {
            return (
                <Field
                name="medicineName"
                label="Vaccine"
                component={this.renderTextInput} />
            );
        }
    }

    renderRecordVaccinationForm = () => {
        const {vaccineList, cattleHealthMetaData, isEditVaccination, isInventory, language, isMedicineSearch} = this.props;
        let diagnosisList = [];
        let frequencyList = [];
        let symptomsList = [];
        if (!isEditVaccination) {
            symptomsList = (cattleHealthMetaData && cattleHealthMetaData.SYMPTOMS) ? this.createObjectFromMetaData(cattleHealthMetaData.SYMPTOMS) : [];
            if (this.props.symptom && cattleHealthMetaData && cattleHealthMetaData.SYMPTOMS && cattleHealthMetaData.SYMPTOMS.length > 0) {
                const selectedSymptom = cattleHealthMetaData.SYMPTOMS.filter((symptom) => {
                    return (symptom.name.toLowerCase()).includes(this.props.symptom.toLowerCase());
                });
                if (selectedSymptom.length > 0) {
                    diagnosisList = this.createObjectFromMetaData(selectedSymptom[0].diagnoses);
                }
              //  diagnosisList = (cattleHealthMetaData && cattleHealthMetaData.SYMPTOMS) ? this.createObjectFromMetaData(cattleHealthMetaData.SYMPTOMS[0].diagnoses) : [];
            }
        }

        frequencyList = (cattleHealthMetaData && cattleHealthMetaData.FREQUENCIES) ? this.createObjectFromFrequencyList(cattleHealthMetaData.FREQUENCIES) : [];

        return (
            <View style={styles.formContainer}>
                {
                (!this.props.isInternetConnected || this.props.comingFrom === "vaccinationOfflineList") &&
                <View style={styles.width100}>
                    <Field
                        name="registration"
                        label={I18n.t('registrationId', {locale:language})}
                        component={this.renderTextInputWithScan} />
                </View>
                }
                <View style={styles.width100}>
                    <Field
                        name="treatmentDate"
                        label={I18n.t('treatmentDate', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
                {!isEditVaccination ?
                    <View style={styles.row}>
                        <View style={styles.width50}>
                            <Field
                                name="symptom"
                                label={I18n.t('symptoms', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                {this.renderPickerItems(symptomsList)}
                            </Field>
                        </View>
                        <View style={styles.width50}>
                            <Field
                                name="disease"
                                label={I18n.t('diagnosis', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                {this.renderPickerItems(diagnosisList)}
                            </Field>
                        </View>
                    </View>
                    :
                    <View style={styles.width100}>
                        <Field
                            name="disease"
                            label={I18n.t('disease', {locale:language})}
                            editable={!isEditVaccination}
                            component={this.renderTextInput} />
                    </View>
                }
                <View style={styles.width100}>
                    {this.renderMedicineField()}
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="unitPrice"
                            label={I18n.t('unitPrice', {locale:language})}
                            editable={!isInventory}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="routeOfAdministration"
                            label={I18n.t('routeofAdministration', {locale:language})}
                            editable={!isInventory}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.routeList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="dose"
                            label={I18n.t('doseRecordVaccination', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="unit"
                            label={I18n.t('unit', {locale:language})}
                            editable={!isInventory}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.width100}>
                    <Field
                        name="performedBy"
                        label={I18n.t('doneBy', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.doneByList)}
                    </Field>
                </View>
                <View style={styles.width100}>
                    <Field
                        name="drugWithdrawalPeriods"
                        label="Drug Withdrawl Period"
                        keyboardType='numeric'
                        component={this.renderTextInput} />
                </View>
                {/* Service cost gets calculated in back-end */}
                {/* <View style={styles.width100}>
                    <Field
                        name="serviceFee"
                        label="Service Cost"
                        component={this.renderTextInput} />
                </View> */}
            </View>);
    }

    onChangeOfflineInput = (offlineValue) => {
        this.setState({
            offlineValue
        });
    }

    handleScan = (data) => {
        this.props.handleSetPropertyValue("registration", data);
    }

    renderTextInputWithScan = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, editable, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <View style={{width: "80%"}}>
                        <InputText
                            onChangeText={onChange}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            editable={editable}
                            label={label}
                            {...restInput} />
                    </View>
                    <View style={{width: "20%"}}>
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "vaccinationOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
                            <Icon
                                name="qrcode-scan"
                                type="material-community"
                                size={26}
                                iconStyle={[styles.qrcodeStyle]}
                                color="#666666" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }


    onSubmitOffline = (values) => {
        const convertutcreatmentDate = moment.utc(values.treatmentDate);
        vaccineList = this.props.vaccineList;
        const dateformattreatmentDate = moment(convertutcreatmentDate).format("YYYY-MM-DD");
        const payload = {
            note: "",
            treatmentDate: dateformattreatmentDate,
            disease: values.disease,
            symptom : values.symptom,
            serviceFee: values.serviceFee,
            serviceTax: "",
            totalFee: "",
            performedBy: values.performedBy,
            cattle: {
                stellaCode: values.registration
            },
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };


        if (this.state.isInventory) {
            const selectedMedicineoffline = vaccineList.filter(med => (med.id === values.medicine));
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicine: {id : values.medicine},
                    selectedMedicineoffline : selectedMedicineoffline[0].medicineName,
                    routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicineName: values.medicineName,
                    routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        }
        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "vaccinationOfflineList") {
                payload._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_VACCINATION_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_VACCINATION_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack();
            return false;
        }
        if (this.props.isEditVaccination && this.props.initialValues.id) {
            payload.id = this.props.initialValues.id;
            payload.prescriptions[0].id = this.props.initialValues.prescriptions[0].id;
            this.props.dispatch(updateVaccinationAction(payload, this.props.token)).then(() => {
                navigateBack();
            });
        } else {
            payload._id = this.props.initialValues._id;
            this.props.dispatch(createVaccinationAction(payload, this.props.token)).then(() => {
                navigateTo("vaccinationDetails");
            });
        }
    }

    render() {
        const {handleSubmit, isEditVaccination, isInternetConnected, language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordVaccination
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('recordVaccination', {locale:language})}
                    vaccinationForm={this.renderRecordVaccinationForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    isEditVaccination={isEditVaccination}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    offlineInput={this.renderRecordVaccinationForm()}
                    handleSubmitOfflineStellaCode={handleSubmit(this.onSubmitOffline)}
                    comingFrom={this.props.comingFrom}
                    handleSearchItemPress={this.onSearchItemPress}
                    isInternetConnected={isInternetConnected}
                    showAlert={this.props.comingFrom == "vaccinationOfflineList" && this.props.offlineVaccinationDetails.error}
                    alertTitle={this.props.offlineVaccinationDetails && this.props.offlineVaccinationDetails.error}
                    language= {language}

                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.registration) {
        errors.registration = "Registration  is required";
    }
    if (!values.treatmentDate) {
        errors.treatmentDate = "Treatment Date is required";
    }
    if (!values.dose) {
        errors.dose = "Dose is required";
    }
    if (!values.symptom) {
        errors.symptom = "Symptom is required";
    }
    if (!values.disease) {
        errors.disease = "Diagnosis is required";
    }
    if (!values.frequency) {
        errors.frequency = "Frequency is required";
    }
    if (!values.routeOfAdministration) {
        errors.routeOfAdministration = "RouteOfAdministration is required";
    }
    if (!values.unit) {
        errors.unit = "Unit is required";
    }
    return errors;
};

const selector = formValueSelector("recordVaccination");

const constructInitailValuesObject = (props, vaccinationDetails) => {
    if (props.isEditVaccination) {
        return {
            ...vaccinationDetails,
            serviceFee: vaccinationDetails.serviceFee ? `${vaccinationDetails.serviceFee}` : "",
            medicine: {id: vaccinationDetails.prescriptions[0].medicine, medicineName: vaccinationDetails.prescriptions[0].medicineName},
            medicineName: vaccinationDetails.prescriptions[0].medicineName,
            frequency: vaccinationDetails.prescriptions[0].frequency,
            dose: `${vaccinationDetails.prescriptions[0].dose}`,
            unit: `${vaccinationDetails.prescriptions[0].unit}`,
            unitPrice: vaccinationDetails.prescriptions[0].unitPrice ? `${vaccinationDetails.prescriptions[0].unitPrice}`: "",
            routeOfAdministration: vaccinationDetails.prescriptions[0].routeOfAdministration,
            drugWithdrawalPeriods: vaccinationDetails.prescriptions[0].drugWithdrawalPeriods ? `${vaccinationDetails.prescriptions[0].drugWithdrawalPeriods}` : "",
            symptom: "symptom"
        };
    }
    if (props.comingFrom === "vaccinationOfflineList" && props.offlineVaccinationDetails) {
        return {
            serviceFee: props.offlineVaccinationDetails.serviceFee,
            symptom:props.offlineVaccinationDetails.symptom,
            disease: props.offlineVaccinationDetails.disease,
            registration: props.offlineVaccinationDetails.cattle.stellaCode,
            treatmentDate: props.offlineVaccinationDetails.treatmentDate,
            performedBy: props.offlineVaccinationDetails.performedBy,
            medicine: props.offlineVaccinationDetails.prescriptions ? props.offlineVaccinationDetails.prescriptions[0].medicine?props.offlineVaccinationDetails.prescriptions[0].medicine.id : "":"",
            medicineName: props.offlineVaccinationDetails.prescriptions ? props.offlineVaccinationDetails.prescriptions[0].medicineName : "",
            dose: props.offlineVaccinationDetails.prescriptions ? `${props.offlineVaccinationDetails.prescriptions[0].dose}` : "",
            unit: props.offlineVaccinationDetails.prescriptions ? `${props.offlineVaccinationDetails.prescriptions[0].unit}` : "",
            unitPrice: props.offlineVaccinationDetails.prescriptions ? `${props.offlineVaccinationDetails.prescriptions[0].unitPrice}` : "",
            routeOfAdministration: props.offlineVaccinationDetails.prescriptions ? `${props.offlineVaccinationDetails.prescriptions[0].routeOfAdministration}` : "",
            drugWithdrawalPeriods: props.offlineVaccinationDetails.prescriptions && props.offlineVaccinationDetails.prescriptions[0].drugWithdrawalPeriods ? `${props.offlineVaccinationDetails.prescriptions[0].drugWithdrawalPeriods}` : "",
            cattle: props.offlineVaccinationDetails.cattle,
            _id: props.offlineVaccinationDetails._id
        };
    }
    return {};
};

const mapStateToProps = (state, ownProps) => ({
    location:state.healthModuleOfflineReducer.location,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    vaccineList: state.lookupDataReducer.vaccineList,
    vaccineListSearch: state.healthModuleReducer.vaccineList,
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    isInventory: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_INVENTORY"),
    isMedicineSearch: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH"),
    symptom: selector(state, "symptom"),
    disease: selector(state, "disease"),
    language: state.localeReducer.language,
    initialValues: ownProps.isEditVaccination ? constructInitailValuesObject(ownProps, state.healthModuleReducer.vaccinationDetails) : constructInitailValuesObject(ownProps, state.healthModuleReducer.vaccinationDetails)
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_VACCINATION_PROPERTY_VALUE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyVaccination: () => dispatch({type: "EMPTY_VACCINATION_LIST"}),
    handleGetVaccineList: (token, name="") => dispatch(getVaccineListAction(token, name)),
    handleEmptyVaccineList: () => dispatch({type: "EMPTY_VACCINE_LIST"}),
    handleGetVaccinationList: (token) => dispatch(getVaccinationListAction(null, token)),
    handleEmptyImages: () => dispatch(resetImagesForRecordAction())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "recordVaccination", validate})
)(authenticatedLayer(RecordVaccinationContainer));
