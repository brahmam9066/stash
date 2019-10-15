import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, BackHandler} from "react-native";
import {reduxForm, Field} from "redux-form";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import TextArea from "../../../../components/TextArea";
import ListPicker from "../../../../components/ListPicker";
import AutoComplete from "../../../../components/AutoComplete";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import Prescription from "../../../../templates/healthModule/observationsTemplates/Prescription";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getMedicineListAction, updateTreatmentAction, createTreatmentAction} from "../../../../actions/healthModule.actions";
import  I18n from "../../../../utils/language.utils";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

class PrescriptionContainer extends Component<{}> {

    state = {
        routeList: [
            {label: "IM", value: "IM"},
            {label: "IV", value: "IV"}
        ]
    };

    componentDidMount() {
        this.props.handleEmptyMedicineList();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        const {token, isEditPrescription, treatmentDetails, handleAddMorePrescription, handleEmptyPrescription} = this.props;
        if (isEditPrescription && treatmentDetails && treatmentDetails.prescriptions && treatmentDetails.prescriptions.length > 0) {
            handleEmptyPrescription();
            treatmentDetails.prescriptions.forEach((item) => {
                const presp = item;
                presp.uniqueId = this.createRandomId();
                handleAddMorePrescription(presp);
            });
        }
        if (this.props.comingFrom === "observationOfflineList"){
            handleEmptyPrescription();
            this.props.offlinePrescriptions.forEach((item) => {
                const presp = item;
                presp.uniqueId = this.createRandomId();
                handleAddMorePrescription(presp);
            });
        }
    }

    componentWillUnmount() {
        this.onCancelEditPrescription();
        this.props.reset();
        this.props.handleEmptyPrescription();
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack();
        return true;
    }

    onSubmit = (values) => {
        console.log("onSubmit :", values)
        const {observationRecordData, handleEmptyPrescription, reset, isEditPrescription} = this.props;
        const payload = {
            id: this.props.observationValues ? this.props.observationValues.id : observationRecordData.id,
            symptom: this.props.observationValues? this.props.observationValues.symptom  : observationRecordData.symptom,
            diagnosis: this.props.observationValues ?this.props.observationValues.diagnosis :observationRecordData.diagnosis,
            note: this.props.observationValues? this.props.observationValues.note:observationRecordData.note,
            heartRate:this.props.observationValues? this.props.observationValues.heartRate: observationRecordData.heartRate,
            ruminaryRate: this.props.observationValues?this.props.observationValues.ruminaryRate:observationRecordData.ruminaryRate,
            pulse: this.props.observationValues?this.props.observationValues.pulse:observationRecordData.pulse,
            treatmentDate:this.props.observationValues? this.props.observationValues.treatmentDate: observationRecordData.treatmentDate,
            weight: this.props.observationValues? this.props.observationValues.weight:observationRecordData.weight,
            temperature: this.props.observationValues?this.props.observationValues.temperature:observationRecordData.temperature,
            respiration: this.props.observationValues?this.props.observationValues.respiration:observationRecordData.respiration,
            clinicalFindings:this.props.observationValues?this.props.observationValues.clinicalFindings: observationRecordData.clinicalFindings,
            nextReview:this.props.observationValues?this.props.observationValues.nextReview: observationRecordData.nextReview,
            observation: this.props.observationValues?this.props.observationValues.observation:observationRecordData.observation,
            serviceFee: this.props.observationValues?this.props.observationValues.serviceFee:observationRecordData.serviceFee,
            serviceTax: this.props.observationValues?this.props.observationValues.serviceTax:observationRecordData.serviceTax,
            totalFee: this.props.observationValues?this.props.observationValues.totalFee:observationRecordData.totalFee,
            cattle: {
                stellaCode:this.props.observationValues ?this.props.observationValues.registration: observationRecordData.cattle.stellaCode
            },
            prescriptions: this.createPrescriptionsArray(values),
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "observationOfflineList") {
                payload._id = this.props._id;
                this.props.dispatch({
                    type: "UPDATE_OBSERVATION_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_OBSERVATION_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack("observationListing");
            return false;
        }
        else if(this.props.isInternetConnected && this.props.observationValues){
            payload._id = this.props._id? this.props._id :"";
            this.props.dispatch(createTreatmentAction(payload, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
            navigateBack("observationListing");
        }
        else{
            this.props.handleUpdateTreatment(payload, this.props.token).then((data) => {
                if (data) {
                    handleEmptyPrescription();
                    reset();
                    navigateTo("observationDetails");
                }
            });
        }
    }

    createPrescriptionsArray = (values) => {
        const {prescriptionList} = this.props;
        console.log("createPrescriptionsArray", values, prescriptionList);
        let prescriptionsArray = [];
        if (prescriptionList.length > 0) {
            prescriptionsArray = JSON.parse(JSON.stringify(prescriptionList));
            // The below line is commented because it handels only first element in prescription.
            // prescriptionsArray[0].medicine = {id: prescriptionsArray[0].medicine.id};
            prescriptionsArray = prescriptionsArray.map((prescription, index) => {
                if(!this.props.isInventory && this.props.isMedicineSearch){
                    prescription.medicineName = prescription.medicine && prescription.medicine.medicineName ? prescription.medicine.medicineName : prescription.medicineName;
                    return prescription;
                } else if (this.props.isInventory) {
                    prescription.medicine = {id: prescription.medicine};
                    return prescription;
                } else {
                    prescription.medicineName = prescription.medicineName;
                    return prescription;
                }
            });
            console.log(prescriptionsArray);
        }
        if (values && Object.keys(values).length > 0) {
            let object = {};
            if (this.props.isInventory) {
                object = {
                    dose: values.dose,
                    unit: values.unit,
                    unitPrice: values.unitPrice,
                    frequency: values.frequency,
                    medicine: {id: values.medicine.id},
                    medicineName: values.medicineName,
                    duration: values.duration,
                    routeOfAdministration: values.routeOfAdministration,
                    followUpDate: values.followUpDate,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                };
            } else {
                object = {
                    dose: values.dose,
                    unit: values.unit,
                    unitPrice: values.unitPrice,
                    frequency: values.frequency,
                    medicineName: this.props.isMedicineSearch ? values.medicine.medicineName : values.medicineName,
                    duration: values.duration,
                    routeOfAdministration: values.routeOfAdministration,
                    followUpDate: values.followUpDate,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                };
            }
            prescriptionsArray.push(object);
        }
        console.log(prescriptionsArray);
        return prescriptionsArray;
    }

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    onAddMorePrescription = (values) => {
        console.log(values)
        const prescriptionObject = {
            uniqueId: this.createRandomId(),
            dose: values.dose,
            unit: values.unit,
            unitPrice: values.unitPrice,
            frequency: values.frequency,
            duration: values.duration,
            routeOfAdministration: values.routeOfAdministration,
            followUpDate: values.followUpDate,
            drugWithdrawalPeriods: values.drugWithdrawalPeriods
        };
        if(!this.props.isInventory && this.props.isMedicineSearch){
            prescriptionObject.medicineName = values.medicine.medicineName;
        } else if (this.props.isInventory) {
            prescriptionObject.medicine = values.medicine.id;
            prescriptionObject.medicineName = values.medicineName;
        } else {
            prescriptionObject.medicineName = values.medicineName;
        }
        console.log("onAddMorePrescription prescriptionObject", prescriptionObject);
        this.props.handleAddMorePrescription(prescriptionObject);
        this.props.reset();
    }


    onRemovePrescription = (uniqueId) => {
        this.props.handleRemovePrescription(uniqueId);
    }

    onEditPrescription = (prescriptionDetails) => {
        const {handleIsEditPrescription, handleSetPropertyValue} = this.props;
        console.log(prescriptionDetails);
        handleIsEditPrescription(true);
        handleSetPropertyValue("uniqueId", prescriptionDetails.uniqueId);
        handleSetPropertyValue("unit", prescriptionDetails.unit);
        handleSetPropertyValue("unitPrice", prescriptionDetails.unitPrice ? `${prescriptionDetails.unitPrice}` : "");
        handleSetPropertyValue("dose", prescriptionDetails.dose ? `${prescriptionDetails.dose}` : "");
        handleSetPropertyValue("frequency", prescriptionDetails.frequency);
        handleSetPropertyValue("duration", prescriptionDetails.duration);
        handleSetPropertyValue("routeOfAdministration", prescriptionDetails.routeOfAdministration);
        handleSetPropertyValue("followUpDate", prescriptionDetails.followUpDate);
        handleSetPropertyValue("drugWithdrawalPeriods", prescriptionDetails.drugWithdrawalPeriods ? prescriptionDetails.drugWithdrawalPeriods : "");
        if(!this.props.isInventory && this.props.isMedicineSearch){
            handleSetPropertyValue("medicine", {medicineName: prescriptionDetails.medicineName});
        } else if (this.props.isInventory) {
            handleSetPropertyValue("medicine", { id: prescriptionDetails.medicine, medicineName: prescriptionDetails.medicineName});
        } else {
            handleSetPropertyValue("medicineName", prescriptionDetails.medicineName);
        }
    }

    onCancelEditPrescription = () => {
        const {handleIsEditPrescription, reset} = this.props;
        handleIsEditPrescription(false);
        reset();
    }

    onUpdatePrescription = (values) => {
        console.log("onUpdatePrescription", values);
        // if(values.medicine && values.medicine.id) values.medicine = values.medicine.id;
        // if(!this.props.isInventory && this.props.isMedicineSearch){
        //     values.medicineName = values.medicine.medicineName
        // }
        if(!this.props.isInventory && this.props.isMedicineSearch){
            values.medicineName = values.medicine.medicineName;
        } else if (this.props.isInventory) {
            values.medicine = values.medicine.id
        } else {
            values.medicineName = values.medicineName;
        }
        const {handleUpdatePrescription, reset, handleIsEditPrescription} = this.props;
        handleUpdatePrescription(values);
        handleIsEditPrescription(false);
        reset();
    }

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
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderListPicker = (field) => {
        const {isInventory} = this.props;
        const {meta: {touched, error}, input: {name, onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (isInventory && name === "medicine.id") this.onChangeMedicine(val);
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

    renderTextArea=(field) => {
        const {meta: {touched, error}, label, underlineColorAndroid, multiline, numberOfLines, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <TextArea
                    onChangeText={onChange}
                    underlineColorAndroid={underlineColorAndroid}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    label={label}
                    {...restInput} />
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
        this.props.handleGetMedicineList(this.props.token, value);
        onChange(value);
    }

    onChangeMedicine = (value) => {
        const {handleSetPropertyValue, medicineList} = this.props;
        console.log("value", value);
        if (value) {
            const selectedMedicine = medicineList.filter(med => (med.id === value));
            handleSetPropertyValue("medicine", selectedMedicine[0]);
            handleSetPropertyValue("unit", selectedMedicine[0].unit);
            handleSetPropertyValue("unitPrice", `${selectedMedicine[0].sellingPricePerUnit}`);
            handleSetPropertyValue("routeOfAdministration", selectedMedicine[0].routeOfAdministration);
            handleSetPropertyValue("medicineName", selectedMedicine[0].medicineName);
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
            object.push({label: item.medicineName, value: item.id});
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

    onPressMedicine = (data) => {
        console.log(data);
        this.props.handleSetPropertyValue("medicine", data);
        this.props.handleSetPropertyValue("medicineName", data.medicineName);
        this.props.handleSetPropertyValue("unit", data.unit);
        this.props.handleSetPropertyValue("unitPrice", `${data.sellingPricePerUnit}`);
        this.props.handleSetPropertyValue("routeOfAdministration", `${data.routeOfAdministration}`);
        this.props.handleEmptyMedicineList();
    }

    renderMedicineField = () => {
        if (this.props.isMedicineSearch) {
            return (
                <Field
                    id="medicine-name"
                    pickerItemId="medicine-picker"
                    name="medicine.medicineName"
                    label="Medicine"
                    dataList={this.props.medicineList}
                    onPressListItem={this.onPressMedicine}
                    component={this.renderAutoSelect}/>
            );
        } else if (this.props.isInventory){
            return (
                <Field
                    name="medicine.id"
                    label="Medicine"
                    component={this.renderListPicker}>
                    <Picker.Item label="Select" value="" />
                    {this.renderPickerItems(this.createObjectFromMetaData(this.props.medicineList))}
                </Field>
            );
        } else {
            return (
                <Field
                name="medicineName"
                label="Medicine"
                component={this.renderTextInput} />
            );
        }
    }

    renderPrescriptionForm = () => {
        const {medicineList, cattleHealthMetaData, isInventory, language, isInternetConnected} = this.props;
        const frequencyList = (cattleHealthMetaData && cattleHealthMetaData.FREQUENCIES) ? this.createObjectFromFrequencyList(cattleHealthMetaData.FREQUENCIES) : [];
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                {this.renderMedicineField()}
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="frequency"
                            label={I18n.t('frequency', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(frequencyList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="duration"
                            label={I18n.t('duration', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="dose"
                            label={I18n.t('dosage', {locale:language})}
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
                <View style={styles.row}>
                    <View style={styles.width50}>
                        {(isInventory) ?
                            <Field
                                name="unitPrice"
                                label={I18n.t('unitPrice', {locale:language})}
                                editable={!isInventory}
                                component={this.renderTextInput} />
                            :
                            <Field
                                name="unitPrice"
                                label={I18n.t('unitPrice', {locale:language})}
                                component={this.renderTextInput} />
                        }
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="routeOfAdministration"
                            label={I18n.t('route', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.routeList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="followUpDate"
                            label={I18n.t('followUpDate', {locale:language})}
                            component={this.renderDatePicker} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="drugWithdrawalPeriods"
                            label="Drug Withdrawl Period"
                            keyboardType='numeric'
                            component={this.renderTextInput} />
                    </View>
                </View>
            </View>);
    }

    render() {
        const {handleSubmit, prescriptionList, medicineList, isEditPrescriptionDetails, language} = this.props;
        return (
            <View style={styles.appContainer}>
                <Prescription
                    onbackPress={navigateBack}
                    toolbarTitle="Record Observation"
                    prescriptionForm={this.renderPrescriptionForm()}
                    handleAddMorePress={handleSubmit(this.onAddMorePrescription)}
                    handleSavePress={handleSubmit(this.onSubmit)}
                    prescriptionList={prescriptionList}
                    medicineList={medicineList}
                    handleRemovePrescription={this.onRemovePrescription}
                    handleEditPrescription={this.onEditPrescription}
                    isEditPrescriptionDetails={isEditPrescriptionDetails}
                    handleCancelPress={this.onCancelEditPrescription}
                    handleUpdatePress={handleSubmit(this.onUpdatePrescription)}
                    isInventory={this.props.isInventory}
                    isMedicineSearch={this.props.isMedicineSearch}
                    comingFrom={this.props.comingFrom}
                    offlinePrescriptions={this.props.offlinePrescriptions}
                    language={language}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (values && Object.keys(values).length > 0) {
        if (!values.medicine) {
            errors.medicine = "Medicine is required"
        }
        if (!values.medicineName) {
            errors.medicineName = "Medicine Name is required";
        }
        if (!values.frequency) {
            errors.frequency = "Frequency is required";
        }
        if (!values.dose) {
            errors.dose = "Dose is required";
        }
        if (!values.unit) {
            errors.unit = "Unit is required";
        }
        if (!values.routeOfAdministration) {
            errors.routeOfAdministration = "Route is required";
        }
        if (!values.followUpDate) {
            errors.followUpDate = "FollowUpDate is required";
        }
    }
    return errors;
};

const mapStateToProps = (state,ownProps) => ({
    token: state.authReducer.token,
    location:state.healthModuleOfflineReducer.location,
    isInternetConnected: state.appReducer.isInternetConnected,
    isInventory: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_INVENTORY"),
    isMedicineSearch: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH"),
    medicineList: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH") ? state.healthModuleReducer.medicineList : state.lookupDataReducer.medicineList,
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    prescriptionList: state.healthModuleReducer.prescriptionList,
    observationRecordData: state.healthModuleReducer.observationRecordData,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    prescriptionDetails: state.healthModuleReducer.prescriptionDetails,
    isEditPrescriptionDetails: state.healthModuleReducer.isEditPrescriptionDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_PRESCRIPTION_PROPERTY_VALUE", property, value}),
    handleUpdateTreatment: (payload, token) => dispatch(updateTreatmentAction(payload, token)),
    handleAddMorePrescription: payload => dispatch({type: "SET_PRESCRIPTION", payload}),
    handleEmptyPrescription: () => dispatch({type: "EMPTY_PRESCRIPTION"}),
    handleRemovePrescription: uniqueId => dispatch({type: "REMOVE_PRESCRIPTION", uniqueId}),
    handleSetPrescriptionDetails: payload => dispatch({type: "SET_PRESCRIPTION_DETAILS", payload}),
    handleIsEditPrescription: payload => dispatch({type: "EDIT_PRESCRIPTION_DETAILS", payload}),
    handleUpdatePrescription: payload => dispatch({type: "UPDATE_PRESCRIPTION_DETAILS", payload}),
    handleGetMedicineList: (token, name="") => dispatch(getMedicineListAction(token, name)),
    handleEmptyMedicineList: () => dispatch({type: "EMPTY_MEDICINE_LIST"})
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "prescription", validate})
)(authenticatedLayer(PrescriptionContainer));
