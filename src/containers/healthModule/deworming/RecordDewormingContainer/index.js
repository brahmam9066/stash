import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, Picker, TouchableOpacity, BackHandler} from "react-native";
import {Icon} from "react-native-elements";
import {reduxForm, Field, destroy} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import TextArea from "../../../../components/TextArea";
import ListPicker from "../../../../components/ListPicker";
import AutoComplete from "../../../../components/AutoComplete";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordDeworming from "../../../../templates/healthModule/deworming/RecordDewormingTemplate";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {saveDewormingAction, updateDewormingAction, getDewormingListAction, getDewormerListAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {resetImagesForRecordAction} from "../../../../actions/imageUpload.action";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    inspectedById: PropTypes.string,
    handleSaveDeworming: PropTypes.func,
    getDeworming: PropTypes.func,
    handleSubmit: PropTypes.func,
    dewormingDetails: PropTypes.object,
    handleUpdateDeworming: PropTypes.func,
    searchList: PropTypes.array,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    destroyForm: PropTypes.func,
    getHealthMetaData: PropTypes.func,
    getOrgConfig: PropTypes.func,
    dewormerList: PropTypes.array,
    handleSetPropertyValue: PropTypes.func,
    comingFrom: PropTypes.string,
    offlineDewormingDetails: PropTypes.object
};

const defaultProps = {
    token: "",
    inspectedById: "",
    handleSaveDeworming: () => {},
    getDeworming: () => {},
    handleSubmit: () => {},
    getHealthMetaData: () => {},
    getOrgConfig: () => {},
    dewormerList: [],
    dewormingDetails: {},
    handleUpdateDeworming: () => {},
    searchList: [],
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    destroyForm: () => {},
    handleSetPropertyValue: () => {},
    comingFrom: "",
    offlineDewormingDetails: {}
};

class RecordDewormingContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offlineValue: "",
            stellaCode: "",
            cattleDetails: {},
            routeList: [
                {label: "IM", value: "IM"},
                {label: "IV", value: "IV"}
            ]
        };
    }

    componentDidMount() {
        this.props.handleEmptyDewormerList();
        if (this.props.isEditDeworming || this.props.comingFrom === "dewormingOfflineList") {
            this.setState({
                stellaCode: this.props.initialValues.cattle ? this.props.initialValues.cattle.stellaCode : "",
                cattleDetails: this.props.initialValues.cattle ? this.props.initialValues.cattle : {}
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dewormingDetails.cattle) {
            this.setState({
                stellaCode: nextProps.dewormingDetails.cattle.stellaCode,
                cattleDetails: nextProps.dewormingDetails.cattle
            });
        }
    }

    componentWillUnmount() {
        this.props.reset();
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
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "dewormingOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
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

    renderOffineInputbox = () => {
        const wormList = [
            {label: "Endo", value: "Endo"},
            {label: "Ecto", value: "Ecto"}
        ];
        const doneBy = [
            {label: "GovtDoctor", value: "GovtDoctor"},
            {label: "PvtDoctor", value: "PvtDoctor"},
            {label: "Self", value: "Self"}
        ];
        const {dewormerList, cattleHealthMetaData, isInventory, language} = this.props;
        const frequencyList = (cattleHealthMetaData && cattleHealthMetaData.FREQUENCIES) ? this.createObjectFromFrequencyList(cattleHealthMetaData.FREQUENCIES) : [];
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    <Field
                        name="registration"
                        label={I18n.t('registrationId', {locale:language})}
                        component={this.renderTextInputWithScan} />
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="treatmentDate"
                            label={I18n.t('date', {locale:language})}
                            component={this.renderDatePicker} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="nextReview"
                            label={I18n.t('nextReviewDate', {locale:language})}
                            component={this.renderDatePicker} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="worm"
                            label={I18n.t('worm', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(wormList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="performedBy"
                            label={I18n.t('doneBy', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(doneBy)}
                        </Field>
                    </View>
                </View>
                <View style={styles.width100}>
                    {isInventory ?
                        <Field
                            name="medicine"                            
                            label={I18n.t('dewormer', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.createObjectFromMedicine(dewormerList))}
                        </Field>
                        : <Field
                            name="medicineName"
                            label={I18n.t('dewormer', {locale:language})}
                            component={this.renderTextInput} />
                    }
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="routeOfAdministration"
                            label={I18n.t('route', {locale:language})}
                            editable={!isInventory}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.routeList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="dose"
                            label={I18n.t('dosage', {locale:language})}
                            format={value => (value ? `${value}` : "")}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="unitPrice"
                            label={I18n.t('unitPrice', {locale:language})}
                            editable={!isInventory}
                            format={value => (value ? `${value}` : "")}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="unit"
                            label={I18n.t('unit', {locale:language})}
                            editable={!isInventory}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.width100}>
                            <Field
                                name="drugWithdrawalPeriods"
                                label="Drug Withdrawl Period"
                                keyboardType='numeric'
                                component={this.renderTextInput} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    onSubmitOffline = (value) => {
        const convertutcreatmentDate = moment.utc(value.treatmentDate);
        const dateformattreatmentDate = moment(convertutcreatmentDate).format("YYYY-MM-DD");
        const convertutcnextreview = moment.utc(value.nextReview);
        const dateformatnextreview = moment(convertutcnextreview).format("YYYY-MM-DD");
        const data = {
            treatmentDate: dateformattreatmentDate,
            worm: value.worm ? value.worm : "",
            performedBy: value.performedBy ? value.performedBy : "",
            nextReview: dateformatnextreview,
            serviceFee: "0",
            serviceTax: "0",
            cattle: {stellaCode: value.registration},
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        if (!this.props.isInventory) {
            data.prescriptions = [{
                medicineName: value.medicineName ? value.medicineName : null,
                frequency: value.frequency ? value.frequency : "",
                duration: value.duration ? value.duration : "",
                dose: value.dose ? value.dose : "",
                unit: value.unit ? value.unit : "",
                unitPrice: value.unitPrice ? value.unitPrice : "",
                routeOfAdministration: value.routeOfAdministration ? value.routeOfAdministration : "",
                drugWithdrawalPeriods: value.drugWithdrawalPeriods
            }];
        } else {
            data.prescriptions = [{
                medicine: value.medicine ? {id: value.medicine.id} : null,
                frequency: value.frequency ? value.frequency : "",
                duration: value.duration ? value.duration : "",
                dose: value.dose ? value.dose : "",
                unit: value.unit ? value.unit : "",
                unitPrice: value.unitPrice ? value.unitPrice : "",
                routeOfAdministration: value.routeOfAdministration ? value.routeOfAdministration : "",
                drugWithdrawalPeriods: value.drugWithdrawalPeriods
            }];
        }

        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "dewormingOfflineList") {
                data._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_DEWORMING_OFFLINE_LIST",
                    data
                });
            } else {
                data._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_DEWORMING_OFFLINE_LIST",
                    data
                });
            }
            navigateBack();
            return false;
        }


        if (!this.props.isEditDeworming) {
            data._id = this.props.initialValues._id;
            this.props.handleSaveDeworming(data, this.props.token).then((response) => {
                if (response) navigateTo("dewormingDetails", {dewormingDetails: response});
                this.props.destroyForm();
            });
        } else {
            data._id = this.props.initialValues._id;
            this.props.handleUpdateDeworming(data, this.props.token).then((response) => {
                if (response) navigateTo("dewormingDetails", {dewormingDetails: response});
                this.props.destroyForm();
            });
        }
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
        const convertutcnextreview = moment.utc(values.nextReview);
        const dateformatnextreview = moment(convertutcnextreview).format("YYYY-MM-DD");
        const data = {
            treatmentDate: dateformattreatmentDate,
            worm: values.worm ? values.worm : "",
            performedBy: values.performedBy ? values.performedBy : "",
            nextReview: dateformatnextreview,
            serviceFee: "0",
            serviceTax: "0",
            totalFee: "0",
            cattle: {stellaCode: this.state.stellaCode},
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        if (!this.props.isInventory && this.props.isMedicineSearch) {
            data.prescriptions = [
                {
                medicineName: values.medicine.medicineName,
                frequency: values.frequency ? values.frequency : "",
                duration: values.duration ? values.duration : "",
                dose: values.dose ? values.dose : "",
                unit: values.unit ? values.unit : "",
                unitPrice: values.unitPrice ? values.unitPrice : "",
                routeOfAdministration: values.routeOfAdministration ? values.routeOfAdministration : "",
                drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else if (this.props.isInventory) {
            data.prescriptions = [
                {
                    medicineName: values.medicineName ? values.medicineName : null,
                    medicine: values.medicine ? {id: values.medicine.id} : null,
                    frequency: values.frequency ? values.frequency : "",
                    duration: values.duration ? values.duration : "",
                    dose: values.dose ? values.dose : "",
                    unit: values.unit ? values.unit : "",
                    unitPrice: values.unitPrice ? values.unitPrice : "",
                    routeOfAdministration: values.routeOfAdministration ? values.routeOfAdministration : "",
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        } else {
            data.prescriptions = [
                {
                    medicineName: values.medicineName ? values.medicineName : null,
                    frequency: values.frequency ? values.frequency : "",
                    duration: values.duration ? values.duration : "",
                    dose: values.dose ? values.dose : "",
                    unit: values.unit ? values.unit : "",
                    unitPrice: values.unitPrice ? values.unitPrice : "",
                    routeOfAdministration: values.routeOfAdministration ? values.routeOfAdministration : "",
                    drugWithdrawalPeriods: values.drugWithdrawalPeriods
                }
            ];
        }
        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "dewormingOfflineList") {
                data._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_DEWORMING_OFFLINE_LIST",
                    data
                });
            } else {
                data._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_DEWORMING_OFFLINE_LIST",
                    data
                });
            }
            navigateBack();
            return false;
        }
        if (this.props.isEditDeworming) {
            data.id = values.id;
            data.prescriptions[0].id = values.prescriptionId;
            console.log(data, "data");
            this.props.handleUpdateDeworming(data, this.props.token).then((response) => {
                if (response) {
                    this.props.handleEmptyDeworming();
                    this.props.handleGetDewormingList(this.props.token);
                    navigateBack("dewormingDetails");
                }
                this.props.destroyForm();
            });
        } else {
            this.props.handleSaveDeworming(data, this.props.token).then((response) => {
                if (response) {
                    this.props.handleEmptyDeworming();
                    this.props.handleGetDewormingList(this.props.token);
                    this.props.handleEmptyImages();
                    navigateTo("dewormingDetails");
                }
                this.props.destroyForm();
            });
        }
    }

    onChangeMedicine = (values) => {
        const {handleSetPropertyValue, dewormerList} = this.props;
        if (values) {
            const selectedMedicine = dewormerList.filter(med => (med.id === values));
            handleSetPropertyValue("medicine", selectedMedicine[0]);
            handleSetPropertyValue("medicineName", selectedMedicine[0].medicineName);
            handleSetPropertyValue("unit", selectedMedicine[0].unit);
            handleSetPropertyValue("unitPrice", `${selectedMedicine[0].sellingPricePerUnit}`);
            handleSetPropertyValue("routeOfAdministration", selectedMedicine[0].routeOfAdministration);
        }
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, editable, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
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

    renderDatePicker = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxDate, minDate, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                    minDate={minDate}
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
                        if (this.props.isInventory && name === "medicine.id") this.onChangeMedicine(val);
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

    renderTextArea = (field) => {
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
        this.props.handleGetDewormerList(this.props.token, value);
        onChange(value);
    }

    createObjectFromMedicine = (list) => {
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
        this.props.handleSetPropertyValue("medicine", data);
        this.props.handleSetPropertyValue("medicineName", data.medicineName);
        this.props.handleSetPropertyValue("unit", data.unit);
        this.props.handleSetPropertyValue("unitPrice", `${data.sellingPricePerUnit} `);
        this.props.handleSetPropertyValue("routeOfAdministration", data.routeOfAdministration);
        this.props.handleEmptyDewormerList();
    }

    renderMedicineField = () => {
        if (this.props.isMedicineSearch && this.props.isInternetConnected) {
            return (
                <Field
                    id="medicine-name"
                    pickerItemId="medicine-picker"
                    name="medicine.medicineName"
                    label="Dewormer"
                    dataList={this.props.dewormerList}
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
                    {this.renderPickerItems(this.createObjectFromMedicine(this.props.dewormerList))}
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

    dewormingForm = () => {
        const wormList = [
            {label: "Endo", value: "Endo"},
            {label: "Ecto", value: "Ecto"}
        ];
        const doneBy = [
            {label: "GovtDoctor", value: "GovtDoctor"},
            {label: "PvtDoctor", value: "PvtDoctor"},
            {label: "Self", value: "Self"}
        ];
        const {dewormerList, cattleHealthMetaData, isInventory, language} = this.props;
        const frequencyList = (cattleHealthMetaData && cattleHealthMetaData.FREQUENCIES) ? this.createObjectFromFrequencyList(cattleHealthMetaData.FREQUENCIES) : [];
        return (
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="treatmentDate"
                            label={I18n.t('date', {locale:language})}
                            component={this.renderDatePicker} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="nextReview"
                            label={I18n.t('nextReviewDate', {locale:language})}
                            component={this.renderDatePicker} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="worm"
                            label={I18n.t('worm', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(wormList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="performedBy"
                            label={I18n.t('doneBy', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(doneBy)}
                        </Field>
                    </View>
                </View>
                <View style={styles.width100}>
                {this.renderMedicineField()}
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="routeOfAdministration"
                            label={I18n.t('route', {locale:language})}
                            editable={!isInventory}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(this.state.routeList)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="dose"
                            label={I18n.t('dosage', {locale:language})}
                            format={value => (value ? `${value}` : "")}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="unitPrice"
                            label={I18n.t('unitPrice', {locale:language})}
                            editable={!isInventory}
                            format={value => (value ? `${value}` : "")}
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
                    <View style={styles.width100}>
                        <Field
                            name="drugWithdrawalPeriods"
                            label="Drug Withdrawl Period"
                            keyboardType='numeric'
                            component={this.renderTextInput} />
                    </View>
                </View>
            </View>
        );
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

    onBackPress = () => {
        if (this.props.comingFrom === "dewormingDetails") {
            navigateBack();
        } else {
            navigateBack("dewormingListing");
        }
    }

    render() {
        const {handleSubmit, isInternetConnected,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordDeworming
                    onbackPress={this.onBackPress}
                    toolbarTitle="Record Deworming"
                    cattleDetails={this.state.cattleDetails}
                    isEditDeworming={this.props.isEditDeworming}
                    dewormingForm={this.dewormingForm()}
                    handleSubmit={handleSubmit(this.onSubmit)}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    offlineInput={this.renderOffineInputbox()}
                    stellaCode={this.state.stellaCode}
                    comingFrom={this.props.comingFrom}
                    handleSubmitOffline={handleSubmit(this.onSubmitOffline)}
                    isInternetConnected={isInternetConnected}
                    language={language}
                    showAlert={this.props.comingFrom == "dewormingOfflineList" && this.props.offlineDewormingDetails.error}
                    alertTitle={this.props.offlineDewormingDetails && this.props.offlineDewormingDetails.error}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.medicine) {
        errors.medicine =  "Required"
    }
    if (!values.frequency) {
        errors.frequency = "Frequency is Required";
    }
    if (!values.treatmentDate) {
        errors.treatmentDate = "TreatmentDate is Required";
    }
    if (!values.nextReview) {
        errors.nextReview = "NextReview is Required";
    }
    if (!values.worm) {
        errors.worm = "Worm is Required";
    }
    if (!values.dose) {
        errors.dose = "Dose is Required";
    }
    if (!values.unit) {
        errors.unit = "Unit is Required";
    }
    if (!values.routeOfAdministration) {
        errors.routeOfAdministration = "Route is Required";
    }
    return errors;
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
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    isInventory: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_INVENTORY"),
    isMedicineSearch: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH"),
    inspectedById: state.farmAdminReducer.userDetails.id,
    dewormerList: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH") ? state.healthModuleReducer.dewormerList : state.lookupDataReducer.dewormerList,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language,
    initialValues: constructDewormingEditObject(ownProps, state.healthModuleReducer.dewormingDetails)
});

const constructDewormingEditObject = (props, dewormingDetails) => {
    if (props.isEditDeworming) {
        return {
            ...dewormingDetails,
            treatmentDate: dewormingDetails.treatmentDate,
            performedBy: dewormingDetails.performedBy,
            prescriptionId: dewormingDetails.prescriptions ? dewormingDetails.prescriptions[0].id : "",
            medicine: dewormingDetails.prescriptions ? { id: dewormingDetails.prescriptions[0].medicine, medicineName: dewormingDetails.prescriptions[0].medicineName} : "",
            medicineName: dewormingDetails.prescriptions ? dewormingDetails.prescriptions[0].medicineName : "",
            dose: dewormingDetails.prescriptions ? `${dewormingDetails.prescriptions[0].dose}` : "",
            unit: dewormingDetails.prescriptions ? `${dewormingDetails.prescriptions[0].unit}` : "",
            unitPrice: dewormingDetails.prescriptions ? `${dewormingDetails.prescriptions[0].unitPrice}` : "",
            routeOfAdministration: dewormingDetails.prescriptions ? `${dewormingDetails.prescriptions[0].routeOfAdministration}` : "",
            drugWithdrawalPeriods: dewormingDetails.prescriptions && dewormingDetails.prescriptions[0].drugWithdrawalPeriods ? `${dewormingDetails.prescriptions[0].drugWithdrawalPeriods}` : "",
            cattle: dewormingDetails.cattle,
            id: dewormingDetails.id
        };
    }
    if (props.comingFrom === "dewormingOfflineList" && props.offlineDewormingDetails) {
        return {
            registration: props.offlineDewormingDetails.cattle.stellaCode,
            treatmentDate: props.offlineDewormingDetails.treatmentDate,
            nextReview: props.offlineDewormingDetails.nextReview,
            performedBy: props.offlineDewormingDetails.performedBy,
            worm: props.offlineDewormingDetails.worm,
            medicine: props.offlineDewormingDetails.prescriptions ? props.offlineDewormingDetails.prescriptions[0].medicine ?props.offlineDewormingDetails.prescriptions[0].medicine.id :"" :"",
            medicineName: props.offlineDewormingDetails.prescriptions ? props.offlineDewormingDetails.prescriptions[0].medicineName : "",
            dose: props.offlineDewormingDetails.prescriptions ? `${props.offlineDewormingDetails.prescriptions[0].dose}` : "",
            unit: props.offlineDewormingDetails.prescriptions ? `${props.offlineDewormingDetails.prescriptions[0].unit}` : "",
            unitPrice: props.offlineDewormingDetails.prescriptions ? `${props.offlineDewormingDetails.prescriptions[0].unitPrice}` : "",
            routeOfAdministration: props.offlineDewormingDetails.prescriptions ? `${props.offlineDewormingDetails.prescriptions[0].routeOfAdministration}` : "",
            drugWithdrawalPeriods: props.offlineDewormingDetails.prescriptions && props.offlineDewormingDetails.prescriptions[0].drugWithdrawalPeriods ? `${props.offlineDewormingDetails.prescriptions[0].drugWithdrawalPeriods}` : "",
           // routeOfAdministration: dewormingDetails.prescriptions ? `${dewormingDetails.prescriptions[0].routeOfAdministration}` : "",
            cattle: props.offlineDewormingDetails.cattle,
            _id: props.offlineDewormingDetails._id
        };
    }
    return {};
};

const mapDispatchToProps = dispatch => ({
    handleSaveDeworming: (payload, token) => dispatch(saveDewormingAction(payload, token)),
    handleUpdateDeworming: (payload, token) => dispatch(updateDewormingAction(payload, token)),
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_DEWORMING_PROPERTY_VALUE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    destroyForm: () => dispatch(destroy("recordDeworming")),
    handleGetDewormingList: token => dispatch(getDewormingListAction(null, token)),
    handleEmptyDeworming: () => dispatch({type: "EMPTY_DEWORMING_LIST"}),
    handleEmptyDewormerList: () => dispatch({type: "EMPTY_DEWORMER_LIST"}),
    handleGetDewormerList: (token, name="") => dispatch(getDewormerListAction(token, name)),
    handleEmptyImages: () => dispatch(resetImagesForRecordAction())
});

RecordDewormingContainer.propTypes = propTypes;
RecordDewormingContainer.defaultProps = defaultProps;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "recordDeworming", validate})
)(authenticatedLayer(RecordDewormingContainer));
