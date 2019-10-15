import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, TouchableOpacity,BackHandler} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";
import {Icon} from "react-native-elements";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import TextArea from "../../../../components/TextArea";
import ListPicker from "../../../../components/ListPicker";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordObservation from "../../../../templates/healthModule/observationsTemplates/RecordObservation";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {createTreatmentAction, updateTreatmentAction, getTreatmentListAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

class RecordObservationContainer extends Component<{}> {

    state = {
        stellaCode: "",
        cattleDetails: {},
        doneByList: [
            {label: "GovtDoctor", value: "GovtDoctor"},
            {label: "PvtDoctor", value: "PvtDoctor"},
            {label: "Self", value: "Self"}
        ],
       // lat: 0,
       // lng: 0
    }

    componentDidMount() {
       // this.checkForLocation();
        if (this.props.isEditTreatment) {
            this.setState({
                stellaCode: this.props.initialValues.cattle ? this.props.initialValues.cattle.stellaCode : "",
                cattleDetails: this.props.initialValues.cattle ? this.props.initialValues.cattle : {}
            });
        }
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    // checkForLocation = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         this.setState({
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         });
    //     });
    // }

    componentWillUnmount() {
        this.props.reset();
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack();
        return true;
    }
    
    onSubmit = (values) => {
        const convertutcreatmentDate = moment.utc(values.treatmentDate);
        const dateformattreatmentDate = moment(convertutcreatmentDate).format("YYYY-MM-DD");
        const convertutcnextReview = moment.utc(values.nextReview);
        const dateformatnextReview = moment(convertutcnextReview).format("YYYY-MM-DD");
        const {orgConfiguration, isEditTreatment, treatmentDetails} = this.props;
        const payload = {
            symptom: values.symptom,
            diagnosis: values.diagnosis,
            note: values.note,
            heartRate: values.heartRate,
            ruminaryRate: values.ruminaryRate,
            pulse: values.pulse,
            treatmentDate: dateformattreatmentDate,
            weight: values.weight,
            temperature: values.temperature,
            respiration: values.respiration,
            clinicalFindings: values.clinicalFindings,
            nextReview: dateformatnextReview,
            observation: "",
            serviceFee: "",
            serviceTax: "",
            totalFee: "",
            cattle: {
                stellaCode: this.state.stellaCode
            },
            performedBy: values.performedBy,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };

        const checkEnablePrescription = orgConfiguration.filter(item => (item.configName === "ENABLE_PRESCRIPTION"));

        if (isEditTreatment) {
            payload.id = treatmentDetails.id;
            this.props.handleUpdateTreatment(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleEmptyTreatment();
                    this.props.handleGetTreatmentList(this.props.token);
                    navigateBack();
                }
            });
        } else {
            this.props.handleCreateTreatment(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleEmptyTreatment();
                    this.props.handleGetTreatmentList(this.props.token);
                    if (checkEnablePrescription.length > 0 && checkEnablePrescription[0].value === "TRUE") {
                        navigateTo("prescription");
                    } else {
                        navigateTo("observationDetails");
                    }
                }
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

    renderDatePicker = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, minDate, maxDate, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                        if (name === "symptom") {
                            this.props.dispatch({type: "RESET_OBSERVATION_PROPERTY_VALUE", property: "diagnosis"});
                        }
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
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "observationOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
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

    renderRecordObservationForm = () => {
        const {language} = this.props
        return (
            <View style={styles.formContainer}>
                {
                    (!this.props.isInternetConnected || this.props.comingFrom === "observationOfflineList") &&
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
                        label={I18n.t('date', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="heartRate"
                            label={I18n.t('heartRatemin', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="weight"
                            label={I18n.t('weightKg', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="pulse"
                            label={I18n.t('pulsesmin', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="temperature"
                            label={I18n.t('temperatureF', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="ruminaryRate"
                            label={I18n.t('ruminationRateday', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="respiration"
                            label={I18n.t('respirationmin', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                </View>
            </View>);
    }

    renderClinicalFindingsForm = () => {

        const {cattleHealthMetaData,language} = this.props;
        const symptomsList = (cattleHealthMetaData && cattleHealthMetaData.SYMPTOMS) ? this.createObjectFromMetaData(cattleHealthMetaData.SYMPTOMS) : [];

        let diagnosisList = [];
        if (this.props.symptom && cattleHealthMetaData && cattleHealthMetaData.SYMPTOMS && cattleHealthMetaData.SYMPTOMS.length > 0) {
            const selectedSymptom = cattleHealthMetaData.SYMPTOMS.filter((symptom) => {
                return (symptom.name.toLowerCase()).includes(this.props.symptom.toLowerCase());
            });
            diagnosisList = this.createObjectFromMetaData(selectedSymptom[0].diagnoses);
        }

        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    <Field
                        name="clinicalFindings"
                        label={I18n.t('problemsFound', {locale:language})}
                        component={this.renderTextArea} />
                </View>
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
                            name="diagnosis"
                            label={I18n.t('diagnosis', {locale:language})}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(diagnosisList)}
                        </Field>
                    </View>
                </View>
                <View style={styles.width100}>
                    <Field
                        name="note"
                        label={I18n.t('notes', {locale:language})}
                        component={this.renderTextArea} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="nextReview"
                        label={I18n.t('nextReviewDate', {locale:language})}
                        component={this.renderDatePicker} />
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
            </View>);
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

    handleOfflineSubmit = (values) => {
        navigateTo("prescription", {observationValues: values, comingFrom: this.props.comingFrom, offlinePrescriptions: this.props.offlineObservationDetails ? this.props.offlineObservationDetails.prescriptions : [], _id: this.props.offlineObservationDetails ? this.props.offlineObservationDetails._id:""});
    }

    render() {
        const {handleSubmit, isEditTreatment, isInternetConnected,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordObservation
                    onbackPress={navigateBack}
                    toolbarTitle="Record Observation"
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    recordObservationForm={this.renderRecordObservationForm()}
                    clinicalFindingsForm={this.renderClinicalFindingsForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    isEditTreatment={isEditTreatment}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    keyFrom={this.props.comingFrom}
                    comingFrom={this.props.comingFrom}
                    isInternetConnected={isInternetConnected}
                    offlineInput={this.renderRecordObservationForm()}
                    handleSubmitOfflineStellaCode={handleSubmit(this.handleOfflineSubmit)}
                    showAlert={this.props.comingFrom == "observationOfflineList" && this.props.offlineObservationDetails.error}
                    alertTitle={this.props.offlineObservationDetails && this.props.offlineObservationDetails.error}
                    language={language}
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
    if (!values.symptom) {
        errors.symptom = "Symptom is required";
    }
    if (!values.diagnosis) {
        errors.diagnosis = "Diagnosis is required";
    }
    if (!values.treatmentDate) {
        errors.treatmentDate = "TreatmentDate is required";
    }
    if (!values.nextReview) {
        errors.nextReview = "NextReview is required";
    }
    return errors;
};

const selector = formValueSelector("recordObservation");

const mapStateToProps = (state, ownProps) => ({
    location:state.healthModuleOfflineReducer.location,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    symptom: selector(state, "symptom"),
    diagnosis: selector(state, "diagnosis"),
    performedBy: selector(state, "performedBy"),
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    initialValues: ownProps.isEditTreatment ? ownProps.treatmentDetails : constructInitailValuesObject(ownProps),
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language
});

const constructInitailValuesObject = (props) => {
    if (props.comingFrom === "observationOfflineList" && props.offlineObservationDetails) {
        return {
            registration: props.offlineObservationDetails.cattle.stellaCode,
            treatmentDate: props.offlineObservationDetails.treatmentDate,
            heartRate: props.offlineObservationDetails.heartRate,
            weight: props.offlineObservationDetails.weight,
            pulse: props.offlineObservationDetails.pulse,
            temperature: props.offlineObservationDetails.temperature,
            ruminaryRate: props.offlineObservationDetails.ruminaryRate,
            respiration: props.offlineObservationDetails.respiration,
            clinicalFindings: props.offlineObservationDetails.clinicalFindings,
            symptom: props.offlineObservationDetails.symptom,
            diagnosis: props.offlineObservationDetails.diagnosis,
            note: props.offlineObservationDetails.note,
            nextReview: props.offlineObservationDetails.nextReview,
            performedBy: props.offlineObservationDetails.performedBy
        };
    }
    return {};
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCreateTreatment: (payload, token) => dispatch(createTreatmentAction(payload, token)),
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_OBSERVATION_PROPERTY_VALUE", property, value}),
    handleUpdateTreatment: (payload, token) => dispatch(updateTreatmentAction(payload, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyTreatment: () => dispatch({type: "EMPTY_TREATMENT_LIST"}),
    handleGetTreatmentList: token => dispatch(getTreatmentListAction(null, token))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "recordObservation", validate})
)(authenticatedLayer(RecordObservationContainer));
