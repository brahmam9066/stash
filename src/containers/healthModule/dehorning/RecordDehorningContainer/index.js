import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, TouchableOpacity, BackHandler} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";
import {Icon} from "react-native-elements";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import ListPicker from "../../../../components/ListPicker";
import AutoComplete from "../../../../components/AutoComplete";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordDehorning from "../../../../templates/healthModule/dehorningTemplates/RecordDehorning";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {createDehorningAction, updateDehorningAction, getDehorningListAction, getMedicineListAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {resetImagesForRecordAction} from "../../../../actions/imageUpload.action";

import styles from "./styles";

class RecordDehorningContainer extends Component<{}> {

    state = {
        stellaCode: "",
        cattleDetails: {},
        doneByList: [
            {label: "GovtDoctor", value: "GovtDoctor"},
            {label: "PvtDoctor", value: "PvtDoctor"},
            {label: "Self", value: "Self"}
        ]
    }

    componentDidMount() {
        this.props.handleEmptyMedicineList();
        if (this.props.isEditDehorning || this.props.comingFrom === "dehorningOfflineList") {
            this.setState({
                stellaCode: this.props.initialValues.cattle ? this.props.initialValues.cattle.stellaCode : "",
                cattleDetails: this.props.initialValues.cattle ? this.props.initialValues.cattle : {}
            });
        }
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

    handleScan = (data) => {
        this.props.handleSetPropertyValue("registration", data);
    }

    onSubmit = (values) => {
        const convertutcreatmentDate = moment.utc(values.treatmentDate);
        const dateformattreatmentDate = moment(convertutcreatmentDate).format("YYYY-MM-DD");
        let payload = {};
        payload = {
            treatmentDate: dateformattreatmentDate,
            performedBy: values.performedBy,
            cattle: {
                stellaCode: values.registration ? values.registration : this.state.stellaCode
            },
            lat : this.props.location.lat,
            lng : this.props.location.lng
        }
        console.log("values", values);
        if (!this.props.isInventory && this.props.isMedicineSearch) {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    // frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicineName: values.medicine.medicineName,
                    // routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else if (this.props.isInventory) {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    // frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicine: {id: values.medicine.id},
                    // routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else {
            payload.prescriptions = [
                {
                    dose: values.dose,
                    unit: values.unit,
                    // frequency: values.frequency,
                    unitPrice: values.unitPrice,
                    medicineName: values.medicineName,
                    // routeOfAdministration: values.routeOfAdministration,
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        }

        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "dehorningOfflineList") {
                payload._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_DEHORNING_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_DEHORNING_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack();
            return false;
        }

        if (this.props.isEditDehorning && this.props.initialValues.id) {
            payload.id = this.props.initialValues.id;
            payload.prescriptions[0].id = this.props.initialValues.prescriptions[0].id;
            this.props.dispatch(updateDehorningAction(payload, this.props.token)).then((data) => {
                if (data) {
                    this.props.handleEmptyDehorning();
                    this.props.handleGetDehorningList(this.props.token);
                    navigateBack();
                }
            });
        } else {
            payload._id = this.props.initialValues._id;
            this.props.dispatch(createDehorningAction(payload, this.props.token)).then((data) => {
                if (data) {
                    this.props.handleEmptyDehorning();
                    this.props.handleGetDehorningList(this.props.token);
                    this.props.handleEmptyImages();
                    navigateTo("dehorningDetails");
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
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "dehorningOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
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

    renderListPicker = (field) => {
        const {meta: {touched, error}, input: {name, onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (this.props.isInventory && name === "medicine.id") this.onPressMedicine(val);
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

    renderPickerItems = (list) => {
        return list.map((item, index) => {
            return (
                <Picker.Item key={index} label={item.label} value={item.value} />
            );
        });
    }

    createObjectFromMedicineList = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item.medicineName, value: item.id});
        });
        return object;
    }

    onPressMedicine = (data) => {
        console.log(data);
        if(typeof data === "string"){
            data = this.props.medicineList.filter(item => (item.id === data))[0];
        }
        this.props.handleSetPropertyValue("medicine", data);
        this.props.handleSetPropertyValue("unit", data.unit);
        this.props.handleSetPropertyValue("unitPrice", `${data.sellingPricePerUnit}`);
        this.props.handleSetPropertyValue("routeOfAdministration", data.routeOfAdministration);
        this.props.handleEmptyMedicineList("medicineName", data.medicineName);
    }

    renderMedicineField = () => {
        if (this.props.isMedicineSearch && this.props.isInternetConnected) {
            return (
                <Field
                    id="medicine-name"
                    pickerItemId="medicine-picker"
                    name="medicine.medicineName"
                    label="Medicine"
                    dataList={this.props.medicineListSearch}
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
                    {this.renderPickerItems(this.createObjectFromMedicineList(this.props.medicineList))}
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

    renderRecordDehorningForm = () => {
        const {isInventory,isMedicineSearch, language} = this.props;
        return (
            <View style={styles.formContainer}>
                {(!this.props.isInternetConnected || this.props.comingFrom === "dehorningOfflineList") &&
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
                        label={I18n.t('dehorningDate', { locale: language })}
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.width100}>
                    {this.renderMedicineField()}
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="dose"
                            label={I18n.t('doseRecordVaccination', { locale: language })}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="unit"
                            label={I18n.t('unit', { locale: language })}
                            editable={!isInventory}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="performedBy"
                            label={I18n.t('doneBy', { locale: language })}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.doneByList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="drugWithdrawalPeriods"
                            label="Drug Withdrawal Period"
                            keyboardType='numeric'
                            component={this.renderTextInput} />
                    </View>
                </View>
            </View>);
    }

    onChangeOfflineInput = (offlineValue) => {
        this.setState({
            offlineValue
        });
    }

    render() {
        const {handleSubmit, isInternetConnected,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordDehorning
                    onbackPress={navigateBack}
                    toolbarTitle="Record Dehorning"
                    dehorningForm={this.renderRecordDehorningForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    isEditDehorning={this.props.isEditDehorning}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    offlineInput={this.renderRecordDehorningForm()}
                    handleSubmitOfflineStellaCode={handleSubmit(this.onSubmit)}
                    comingFrom={this.props.comingFrom}
                    isInternetConnected={isInternetConnected}
                    language={language}
                    showAlert={this.props.comingFrom == "dehorningOfflineList" && this.props.offlineDehorningDetails.error}
                    alertTitle={this.props.offlineDehorningDetails && this.props.offlineDehorningDetails.error}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.registration) {
        errors.registration = "registration  is required";
    }
    if (!values.treatmentDate) {
        errors.treatmentDate = "Dehorning Date is required";
    }
    if (!values.medicineName) {
        errors.medicineName = "Medicine is required";
    }
    // if (!values.medicine) {
    //     errors.medicine = {
    //         id: "Medicine is required"
    //     };
    // }
    if (!values.medicine) {
        errors.medicine = "Medicine is required"
    }
    if (!values.dose) {
        errors.dose = "Dose is required";
    }
    if (!values.unit) {
        errors.unit = "Unit is required";
    }
    // if (!values.medicineName) {
    //     errors.medicineName = "Medicine is required";
    // }
    return errors;
};

const selector = formValueSelector("recordDehorning");

const constructDehorningEditObject = (props, dehorningDetails) => {
    if (props.isEditDehorning) {
        return {
            ...dehorningDetails,
            treatmentDate: dehorningDetails.treatmentDate,
            performedBy: dehorningDetails.performedBy,
            medicine: {id: dehorningDetails.prescriptions[0].medicine, medicineName: dehorningDetails.prescriptions[0].medicineName},
            medicineName: dehorningDetails.prescriptions ? dehorningDetails.prescriptions[0].medicineName : "",
            dose: dehorningDetails.prescriptions ? `${dehorningDetails.prescriptions[0].dose}` : "",
            unit: dehorningDetails.prescriptions ? `${dehorningDetails.prescriptions[0].unit}` : "",
            drugWithdrawalPeriods: dehorningDetails.prescriptions && dehorningDetails.prescriptions[0].drugWithdrawalPeriods ? `${dehorningDetails.prescriptions[0].drugWithdrawalPeriods}` : "",
            cattle: dehorningDetails.cattle,
            id: dehorningDetails.id
        };
    }
    if (props.comingFrom === "dehorningOfflineList" && props.offlineDehorningDetails) {
        return {
            registration: props.offlineDehorningDetails.cattle.stellaCode,
            treatmentDate: props.offlineDehorningDetails.treatmentDate,
            performedBy: props.offlineDehorningDetails.performedBy,
            medicine: props.offlineDehorningDetails.prescriptions ? props.offlineDehorningDetails.prescriptions[0].medicine ? props.offlineDehorningDetails.prescriptions[0].medicine.id :"" : "",
            medicineName: props.offlineDehorningDetails.prescriptions ? props.offlineDehorningDetails.prescriptions[0].medicineName : "",
            dose: props.offlineDehorningDetails.prescriptions ? `${props.offlineDehorningDetails.prescriptions[0].dose}` : "",
            unit: props.offlineDehorningDetails.prescriptions ? `${props.offlineDehorningDetails.prescriptions[0].unit}` : "",
            drugWithdrawalPeriods: props.offlineDehorningDetails.prescriptions && props.offlineDehorningDetails.prescriptions[0].drugWithdrawalPeriods ? `${props.offlineDehorningDetails.prescriptions[0].drugWithdrawalPeriods}` : "",
            cattle: props.offlineDehorningDetails.cattle,
            _id: props.offlineDehorningDetails._id
        };
    }
    return {};
};

handleCheckInventory = (orgConfiguration, key) => {
    const checkInventory = orgConfiguration.filter(item => (item.configName === key));
    if (checkInventory.length > 0 && checkInventory[0].value === "TRUE") {
        return true;
    }
    return false;
}

const mapStateToProps = (state, ownProps) => ({
    location:state.healthModuleOfflineReducer.location,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    isInventory: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_INVENTORY"),
    isMedicineSearch: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH"),
    medicineList: state.lookupDataReducer.medicineList,
    medicineListSearch: state.healthModuleReducer.medicineList,
    language: state.localeReducer.language,
    initialValues: constructDehorningEditObject(ownProps, state.healthModuleReducer.dehorningDetails)
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_DEHORNING_PROPERTY_VALUE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyDehorning: () => dispatch({type: "EMPTY_DEHORNING_LIST"}),
    handleGetDehorningList: token => dispatch(getDehorningListAction(null, token)),
    handleGetMedicineList: (token, name="") => dispatch(getMedicineListAction(token, name)),
    handleEmptyMedicineList: () => dispatch({type: "EMPTY_MEDICINE_LIST"}),
    handleEmptyImages: () => dispatch(resetImagesForRecordAction())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "recordDehorning", validate})
)(authenticatedLayer(RecordDehorningContainer));
